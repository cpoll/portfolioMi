#!/usr/bin/env bash
#http://benlopatin.com/deploying-static-sites-circle-ci/

DEFAULT="default_aws_profile"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET="ambernaytrotter.com"
DIR="dist/"

BUCKET="s3://$BUCKET"

echo "syncing $DIR to $BUCKET"
aws s3 sync $DIR $BUCKET --cache-control max-age=3600