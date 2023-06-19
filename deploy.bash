#!/bin/bash


#Bash Script that can be used to build and push the various services of the docheart system automatically.

ARG_LIST=$@
COMMAND="$1"
VERSION_NUMBER="v$2"
PROJECT_ID=crowdcomputing-388121
ARTIFACT_REGISTRY_NAME=crowd
IMAGE_BASE_NAME=europe-west1-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY_NAME


function exists_in_list() {
    LIST=$1
    DELIMITER=$2
    VALUE=$3
    LIST_WHITESPACES=`echo $LIST | tr "$DELIMITER" " "`
    for x in $LIST_WHITESPACES; do
        if [ "$x" = "$VALUE" ]; then
            return 0
        fi
    done
    return 1
}

function build() {
    TARGET=$1
    FILEPATH=$2
    if exists_in_list "$ARG_LIST" " " $TARGET ; then
        docker build --build-arg env_file=.env --build-arg prometheus_config_file=prometheus.yml -t $IMAGE_BASE_NAME/$TARGET:$VERSION_NUMBER -f ./$FILEPATH/$TARGET/Dockerfile-dev ./$FILEPATH/$TARGET
        echo "$TARGET built"
    else
        echo "$TARGET skipped"
    fi
}

function push() {
    TARGET=$1
    if exists_in_list "$ARG_LIST" " " $TARGET ; then
        docker push $IMAGE_BASE_NAME/$TARGET:$VERSION_NUMBER
        echo "$TARGET pushed"
    else
        echo "$TARGET skipped"
    fi
}

function deploy() {
    TARGET=$1

    if exists_in_list "$ARG_LIST" " " $TARGET ; then
        gcloud run deploy $TARGET --image $IMAGE_BASE_NAME/$TARGET:$VERSION_NUMBER --region europe-west1 --allow-unauthenticated --min-instances=0 --cpu=1 --memory=1Gi
        echo "$TARGET deployed"
    else
        echo "$TARGET skipped"
    fi
}

$COMMAND task-backend-service ""




