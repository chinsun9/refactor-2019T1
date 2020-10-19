package record_open_bci_with_json;


import java.util.Scanner;


// 문제점 ; 녹화시작 누르면 앞에 쓰레기값 어케하지. => 밴드파워 위치에 특정 rgb가 없으면 json변환 안하기
public class MenuSystem {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		boolean flag = true;
		int interval = 1000;
		
		
		ThreadGetScreenShot ct=null;
		Thread t=null;

		while (flag) {
			System.out.println("1. 녹화 시작\n"
					+ "2. 녹화 종료");

			int select = sc.nextInt();
			switch (select) {
			case 1:
				System.out.println("menusys : 1선택됨.");
				if(ct != null) {
					System.out.println("이미 녹화중입니다.");
				}
				else {

					// 스레드 실행
					ct = new ThreadGetScreenShot(interval);
					t = new Thread(ct, "첫번째");
					t.start();
					System.out.println("스레드 시작됨....");
				}
				break;
			case 2:
			default:
				System.out.println("menusys : 2선택됨.");
				if(ct != null) {
					ct.flag = false;
				}
				sc.close();
				flag = false;
				// 캡쳐 스레드 종료
				// 어레이 json 파일 저장
				break;
			}
		}
		System.out.println("메뉴 시스템 종료");
	}
}