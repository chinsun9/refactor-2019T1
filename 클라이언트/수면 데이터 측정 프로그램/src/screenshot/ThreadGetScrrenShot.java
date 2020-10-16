package screenshot;


public class ThreadGetScrrenShot implements Runnable {

	private int interval;

	public ThreadGetScrrenShot() {
		interval = 1000;
	}
	
	public ThreadGetScrrenShot(int input) {
		interval = input;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		
		while(true) {
			
			ScreenShot.goThread(null);
			
			try {
				Thread.sleep(interval);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}

	public static void main(String[] args) {

		int i = 5000;
		System.out.println(i + "밀리초마다 스크린샷을 저장합니다");
		ThreadGetScrrenShot ct = new ThreadGetScrrenShot(i);
		Thread t = new Thread(ct, "첫번째");

		t.start();
	}
}