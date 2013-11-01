BRANCH=reading-map

cd /opt/lampp/htdocs/kals
git --git-dir=/opt/lampp/htdocs/kals/.git clean -f -d
git --git-dir=/opt/lampp/htdocs/kals/.git reset --hard origin/$BRANCH
git --git-dir=/opt/lampp/htdocs/kals/.git pull

git --git-dir=/opt/lampp/htdocs/kals/.git merge origin/$BRANCH --no-commit
