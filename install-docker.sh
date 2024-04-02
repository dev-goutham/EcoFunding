apt update

apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" 

apt update -y

apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y