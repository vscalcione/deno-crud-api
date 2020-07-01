#!/bin/bash

# Bash Menu Script Example

PS3='Please enter your choice: '
options=("Run app.ts in this folder" "Run app.ts in deno-crud-api/deno-crud-api-v.1 folder" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Run app.ts in this folder")
            deno run --allow-net --allow-read api.ts
            ;;
        "Run app.ts in deno-crud-api/deno-crud-api-v.1 folder")
            cd deno-crud-api-v.1
	    deno run --allow-env --allow-net --allow-read --allow-write app.ts
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
