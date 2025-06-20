# Match Now API

NestJS 기반의 스포츠 매치 정보 API 서버입니다.

## 요구사항

- Node.js 22.15.1
- MongoDB 7.0 이상
- pnpm
- PM2 (글로벌 설치 권장)

## 설치 및 실행
# Node.js 버전 확인
node --version

# pnpm 설치 (없다면)
npm install -g pnpm

# PM2 설치
npm install -g pm2

# MongoDB 설치
npm install mongodb

# 프로젝트 실행
pnpm install
pnpm run build
npm run pm2:start:local



### Ubuntu Node.js v22 설치
# 시스템 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# curl 설치 (없는 경우)
sudo apt install -y curl

# NodeSource 저장소 추가 (Node.js 22.x용)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Node.js 설치
sudo apt-get install -y nodejs

# 설치 확인
node --version
npm --version




### MongoDB 설치 및 실행
# macOS (Homebrew 사용)
$ brew tap mongodb/brew
$ brew install mongodb-community@7.0
MongoDB 서비스 시작
$ brew services start mongodb-community@7.0
$ brew services stop mongodb-community@7.0

# Ubuntu/Debian
1. 기존 MongoDB 관련 패키지 정리
$ sudo apt remove --purge mongodb-org*
$ sudo apt autoremove
$ sudo apt autoclean
2. MongoDB 공식 저장소 추가
# GPG 키 추가
$ curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# 저장소 추가 (Ubuntu 버전에 맞게)
$ echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

3. 패키지 목록 업데이트 및 설치
$ sudo apt update
$ sudo apt install -y mongodb-org

5. MongoDB 서비스 시작 및 활성화
$ sudo systemctl start mongod
$ sudo systemctl restart mongod
$ sudo systemctl enable mongod
$ sudo systemctl status mongod