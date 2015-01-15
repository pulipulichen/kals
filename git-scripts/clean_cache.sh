if [ -z "$KALS_PATH" ]; KALS_PATH=/var/www/moodle/kals; fi

rm $KALS_PATH/system/cache/*.css
rm $KALS_PATH/system/cache/*.js
rm $KALS_PATH/system/cache/[0-9]*
rm $KALS_PATH/system/cache/[a-z]*

