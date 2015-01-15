if [ -z "$BRANCH" ]; BRANCH=kals/master; fi
if [ -z "$KALS_PATH" ]; KALS_PATH=/var/www/moodle/kals; fi

cd $KALS_PATH
git --git-dir="$KALS_PATH"/.git clean -f -d
git --git-dir="$KALS_PATH"/.git reset --hard $BRANCH
git --git-dir="$KALS_PATH"/.git pull --rebase --force kals

git --git-dir="$KALS_PATH"/.git merge origin/$BRANCH --no-commit

"$KALS_PATH"/git-scripts/clean_cache.sh
"$KALS_PATH"/git-scripts/create_cache.sh