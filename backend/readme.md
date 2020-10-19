# refactor-gp-backend

## 개선

### 회원가입시 userNum 부여

#### 문제

```
select count(*) as count from luciddb.USER
```

- 새로운 유저 등록시 이미 등록된 사람의 수 + 1 해서 유니크 id를 부여하는데,
- 탈퇴한 사람이 한사람이라도 있으면 제대로 동작하지 않는다.

#### 개선방향

- auto increase 사용
- 맨 마지막 사용자 userNum에서 +1

### id 중복확인 없음

#### 같은 아이디로 가입 가능

#### 개선방향

- 중복검사 추가..
