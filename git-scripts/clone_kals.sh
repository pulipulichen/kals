if [ -z "$KALS_BRANCH" ]; then KALS_BRANCH=kals/master; fi
if [ -z "$KALS_PATH" ]; then KALS_PATH=/var/www/moodle/kals; fi

#echo $KALS_PATH

cd $KALS_PATH
git clone git://github.com/pulipulichen/kals.git
git reset --hard origin/master