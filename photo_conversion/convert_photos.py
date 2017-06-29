'''
Script file for converting photos for use in blog.
Also creates the photos.json file

Expectations: source_photos contains folders one deep, where the folder name is the category name
    only jpg, jpeg and gif will be copied
'''
#pylint: disable=C0301

import os
import json
import re
from shutil import copyfile
from PIL import Image

def resize_image(source_path, destination_path, target_width, quality):
    '''
        Resizes the image to target width and saves it in destination_folder
    '''
    print("   opening {0}".format(source_path))
    image = Image.open(source_path)

    width, height = image.size
    scale = target_width / float(width)
    target_height = int(round(height * scale))

    if scale < 1: # don't stretch photos
        print("   scaling from {}/{} to {}/{} (factor {})".format(
            width, height, target_width, target_height, scale))
        image = image.resize((target_width, target_height), Image.ANTIALIAS)
    else:
        target_width, target_height = width, height

    print("   saving result to {0}".format(destination_path))
    image.save(destination_path, optimize=True, quality=quality)
    print("   resulting filesize: {0}".format(sizeof_fmt(os.stat(destination_path).st_size)))

    return target_width, target_height


_NUMERICAL_SORT_REGEX = re.compile(r'(\d+)')
def numerical_sort(value):
    '''
        Sorting method to sort "2 blah" before "10 blah"
        Courtesy of Martijn Pieters
        https://stackoverflow.com/questions/12093940/reading-files-in-a-particular-order-in-python
    '''
    parts = _NUMERICAL_SORT_REGEX.split(value)
    parts[1::2] = map(int, parts[1::2])
    return parts

def sizeof_fmt(num, suffix='B'):
    '''
    Given number of bits, returns human readable format.
    Courtesy Fred Cirera
    https://stackoverflow.com/questions/1094841/reusable-library-to-get-human-readable-version-of-file-size
    '''
    for unit in ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)

if __name__ == "__main__":
    # Determine and create target dir
    TARGET_DIRECTORY = os.path.join(os.path.dirname(__file__), "processed_photos")
    if not os.path.exists(TARGET_DIRECTORY):
        os.makedirs(TARGET_DIRECTORY)
    print("target directory: {0}".format(TARGET_DIRECTORY))

    CATEGORIES = []
    PHOTOS = []

    for root, dirs, files in os.walk(os.path.join(os.path.dirname(__file__), "source_photos")):

        count = 0
        category = os.path.basename(root)

        for filename in sorted(files, key=numerical_sort):
            prefix, extension = os.path.splitext(filename)
            filepath = os.path.join(root, filename)

            if extension.lower() not in [".jpg", ".jpeg", ".gif"]:
                print("skipping {0}".format(filepath))
            else:
                count += 1
                if category not in CATEGORIES:
                    CATEGORIES.append(category)

                print("processing {0}".format(filepath))

                target_path_dir = os.path.join(TARGET_DIRECTORY, category).lower()
                if not os.path.exists(target_path_dir):
                    os.makedirs(target_path_dir)

                target_filename = "{}{}".format(str(count), extension.lower())
                target_filename_small = "{}_small{}".format(str(count), extension.lower())
                target_path = os.path.join(target_path_dir, target_filename)
                target_path_small = os.path.join(target_path_dir, target_filename_small)

                small_height = 0
                if extension.lower() in [".gif"]:
                    print("copying {} to {}".format(filepath, target_path.format("")))
                    copyfile(filepath, target_path)
                    target_filename_small = target_filename
                    small_height = Image.open(target_path).size[1]
                else:
                    #1920
                    resize_image(filepath, target_path, 1920, 85)
                    #1920/3 (small)
                    _, small_height = resize_image(filepath, target_path_small, int(1920/3), 85)

                PHOTOS.append({
                    "src":os.path.join("assets/photos", category, target_filename).replace("\\", "/"),
                    "smallSrc":os.path.join("assets/photos", category, target_filename_small).replace("\\", "/"),
                    #"smallHeight": small_height,
                    "category":category
                })

    PHOTO_JSON_DATA = {
        "categories": CATEGORIES,
        "photos": PHOTOS
    }
    with open(os.path.join(TARGET_DIRECTORY, "photos.json"), 'w+') as outfile:
        print("writing json data")
        json.dump(PHOTO_JSON_DATA, outfile)
