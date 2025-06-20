# Match Now API

NestJS 기반의 스포츠 매치 정보 API 서버입니다.

## 요구사항

- Node.js v22.15.1 LTS 버전
- MongoDB 4.4 이상 (AVX 미지원 CPU의 경우 4.4 권장)
- pnpm
- PM2 (글로벌 설치 권장)
- Docker (MongoDB 실행용)

## 로컬(Mac)에서 실행하기

1. **Docker 앱 실행**

2. **필수 프로그램 설치 확인**
   - Node.js 확인
     ```bash
     $ node --version
     $ npm --version
     ```
   - pnpm 설치
     ```bash
     $ npm install -g pnpm
     ```
   - PM2 설치
     ```bash
     $ npm install -g pm2
     ```

3. **MongoDB 설치 및 실행**
   - MongoDB 설치
     ```bash
     $ brew tap mongodb/brew
     $ brew install mongodb-community@7.0
     ```
   - MongoDB 서비스 시작
     ```bash
     $ brew services start mongodb-community@7.0
     ```
   - MongoDB가 정상 실행되는지 확인
     ```bash
     $ brew services list | grep mongodb
     ```

4. **프로젝트 의존성 설치**
   ```bash
   $ cd /path/to/your/project
   $ pnpm install
   ```

5. **환경 설정**
   - .env 파일 확인

6. **프로젝트 빌드 및 실행**
   - 개발 모드로 실행
     ```bash
     $ pnpm run start:dev
     ```
   - PM2로 실행
     ```bash
     $ pnpm run build
     $ pnpm run pm2:start:local
     ```

7. **실행 확인**
   - 서버 주소: http://localhost:4011
   - Health Check: http://localhost:4011/health
   - Swagger 문서: http://localhost:4011/document

## 주요 명령어들

- **개발 모드 실행 (파일 변경 시 자동 재시작)**
  ```bash
  $ pnpm run start:dev
  ```

- **PM2 관련 명령어**
  ```bash
  $ npm run pm2:start:local    # PM2로 로컬 실행
  $ npm run pm2:stop          # PM2 정지
  $ npm run pm2:restart       # PM2 재시작
  $ npm run pm2:logs          # 로그 확인
  $ npm run pm2:status        # 상태 확인
  ```

- **테스트 실행**
  ```bash
  $ pnpm run test
  ```

- **코드 포맷팅**
  ```bash
  $ pnpm run format
  ```

## 서버(Ubuntu Desktop PC)에서 실행하기

### 1단계: 기본 환경 준비

```bash
# 시스템 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# curl과 git 설치
sudo apt install -y curl git
```

### 2단계: Node.js v22 설치

```bash
# NodeSource 저장소 추가 (Node.js 22.x용)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Node.js 설치
sudo apt-get install -y nodejs

# 설치 확인
node --version
npm --version
```

### 3단계: pnpm과 PM2 설치

```bash
# pnpm 설치
npm install -g pnpm

# PM2 설치
npm install -g pm2

# 설치 확인
pnpm --version
pm2 --version
```

### 4단계: MongoDB 4.4 설치

```bash
# MongoDB 4.4 컨테이너 실행 (AVX 미지원 CPU 호환)
# 처음엔 MongoDB 7.0 버전으로 시도했으나 현재 Ubuntu Desktop PC에서 사용 중인 CPU가 AVX 지원하지 않아서 4. 버전으로 설치함. (5. 버전부터 CPU가 AVX 지원해야 함)
# AVX 지원 확인
grep -o 'avx[^ ]*' /proc/cpuinfo
# 결과가 없으면 AVX 미지원
# 결과가 있으면 AVX 지원

docker run -d \
  --name mongodb \
  --restart unless-stopped \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:4.4

# 실행 확인
docker ps
docker logs mongodb
```

**참고**: AVX 지원 CPU가 있다면 `mongo:7.0` 사용 가능

### 5단계: 프로젝트 클론 및 설정

```bash
# 프로젝트 클론 (GitHub에서)
git clone <your-repository-url>
cd match-now-server

# 또는 기존 프로젝트가 있다면
cd /path/to/match-now-server

# 프로젝트 의존성 설치
pnpm install
```

### 6단계: 환경 설정

```bash
# .env 파일 생성 및 편집
nano .env
```

**.env 파일 내용:**
```env
MONGODB_URI=mongodb://localhost:27017/match-now-dev
PORT=4011
NODE_ENV=production
APP_NAME=Match Now API
```

### 7단계: 프로젝트 빌드 및 실행

```bash
# 프로젝트 빌드
pnpm run build

# PM2로 실행
pnpm run pm2:start:local

# 실행 상태 확인
pm2 status
pm2 logs
```

### 8단계: 실행 확인

```bash
# Health Check 확인
curl http://localhost:4011/health

# 브라우저에서 확인 (GUI 환경인 경우)
# http://localhost:4011/health
# http://localhost:4011/document (Swagger 문서)
```

### MongoDB 관리 명령어 (Ubuntu)

```bash
# MongoDB 서비스 관리
sudo systemctl start mongod     # 시작
sudo systemctl stop mongod      # 정지
sudo systemctl restart mongod   # 재시작
sudo systemctl status mongod    # 상태 확인

# MongoDB 연결 테스트
mongosh mongodb://localhost:27017/match-now-dev
```