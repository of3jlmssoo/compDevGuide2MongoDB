# compDevGuide2MongoDB

## test
```text
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
      |
      V
    "test": "mocha"

```

### commands
```text
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg    --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
ulimit
ps --no-headers -o comm 1
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod
mongosh
wget https://downloads.mongodb.com/compass/mongodb-compass_1.43.4_amd64.deb
sudo apt install ./mongodb-compass_1.43.4_amd64.deb
mongodb-compass

echo "# compDevGuide2MongoDB" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:of3jlmssoo/compDevGuide2MongoDB.git
git push -u origin main
 
npm init
npm install --save mocha nodemon mongoose
npm fund

  node test/test_helper.js 
```
