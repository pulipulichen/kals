if [ -z "$KALS_BRANCH" ]; then KALS_BRANCH=kals/master; fi
if [ -z "$KALS_PATH" ]; then KALS_PATH=/var/www/moodle/kals; fi

#echo $KALS_PATH

cd $KALS_PATH
git --git-dir="$KALS_PATH"/.git clean -f -d
git --git-dir="$KALS_PATH"/.git reset --hard $KALS_BRANCH
git --git-dir="$KALS_PATH"/.git pull --rebase --force kals

git --git-dir="$KALS_PATH"/.git merge $KALS_BRANCH --no-commit
