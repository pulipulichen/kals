BRANCH=search-function

cd /opt/lampp/htdocs/kals
git --git-dir=/opt/lampp/htdocs/kals/.git reset --hard origin/$BRANCH
git --git-dir=/opt/lampp/htdocs/kals/.git pull
