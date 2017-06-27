import os
from PIL import Image

def resize_image(source_path, destination_path, target_width, quality):
    '''
        Resizes the image to target width and saves it in destination_folder
    '''
    print("   opening {0}".format(source_path))
    image = Image.open(source_path) #with?

    width, height = image.size
    scale = target_width / float(width)
    target_height = int(round(height * scale))

    print("   scaling from {}/{} to {}/{} (factor {})".format(
        width, height, target_width, target_height, scale))
    image = image.resize((target_width, target_height), Image.ANTIALIAS)

    print("   saving result to {0}".format(destination_path))
    image.save(destination_path, optimize=True, quality=quality)
    print("   resulting filesize: {0}".format(sizeof_fmt(os.stat(destination_path).st_size)))

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

    for root, dirs, files in os.walk(os.path.join(os.path.dirname(__file__), "source_photos")):
        count = 1
        for filename in files:
            prefix, extension = os.path.splitext(filename)
            filepath = os.path.join(root, filename)

            if extension not in [".jpg", ".jpeg"]:
                print("skipping {0}".format(filepath))
            else:
                print("processing {0}".format(filepath))

                target_path_dir = os.path.join(TARGET_DIRECTORY, root)
                if not os.path.exists(target_path_dir):
                    os.makedirs(target_path_dir)

                #target_path = os.path.join(target_path_dir, prefix + "{0}" + extension)
                target_path = os.path.join(target_path_dir, str(count) + "{0}" + extension)

                if not os.path.exists(TARGET_DIRECTORY):
                    os.makedirs(TARGET_DIRECTORY)

                #Target 1920
                resize_image(filepath, target_path.format(""), 1920, 90)

                #Target 1920/3
                resize_image(filepath, target_path.format("_small"), int(1920/3), 90)

            count += 1
