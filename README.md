# Match Now API
NestJS 기반의 스포츠 매치 정보 API 서버입니다.

## 요구사항
- Node.js v22.15.1 LTS 버전
- MongoDB 7.0 이상
- pnpm
- PM2 (글로벌 설치 권장)



## 로컬(Mac)에서 실행하기
1. Docker 앱 실행
2. 필수 프로그램 설치 확인
* Node.js 확인
- $ node --version
- $ npm --version
* pnpm 설치
- $ npm install -g pnpm
- PM2 설치
   $ npm install -g pm2
3. MongoDB 설치 및 실행
- MongoDB 설치
$ brew tap mongodb/brew
$ brew install mongodb-community@7.0
- MongoDB 서비스 시작
$ brew services start mongodb-community@7.0
-  MongoDB가 정상 실행되는지 확인
$ brew services list | grep mongodb
4. 프로젝트 의존성 설치
$ cd /path/to/your/project
$ pnpm install
5. 환경 설정
- .env 파일 확인
6. 프로젝트 빌드 및 실행
- 개발 모드로 실행
$ pnpm run start:dev
- PM2로 실행
$ pnpm run build
$ pnpm run pm2:start:local
7. 실행 확인
- 서버 주소: http://localhost:4011
- Health Check: http://localhost:4011/health
- Swagger 문서: http://localhost:4011/document
# 주요 명령어들
- 개발 모드 실행 (파일 변경 시 자동 재시작)
$ pnpm run start:dev
- PM2 관련 명령어
$ npm run pm2:start:local    # PM2로 로컬 실행
$ npm run pm2:stop          # PM2 정지
$ npm run pm2:restart       # PM2 재시작
$ npm run pm2:logs          # 로그 확인
$ npm run pm2:status        # 상태 확인
- 테스트 실행
$ pnpm run test
- 코드 포맷팅
$ pnpm run format





### 서버(Ubuntu Desktop PC)에서 실행하기










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