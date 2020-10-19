package record_open_bci_with_json;


import java.awt.AWTException;
import java.awt.HeadlessException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.imageio.ImageIO;

// 수면 데이터 녹화하는 pc에서 작동시킬 캡쳐 프로그램 제작중
// 스레드로 2초에 한번 실행하도록 할것임.

public class ScreenShot {
	public static void main(String[] args) {
		goThread(null);
	}

	public static void goThread(ArrayList[] arrBP) {


		// 1. 화면 캡쳐
		BufferedImage screenShot = getScreenShot();

		ArrayList<Byte> arr;
		// 캡쳐에서 추출.
		arr = Img2JsonData.getBandPower(screenShot);

		for (int i = 0; i < arr.size(); i++) {
			arrBP[i].add(arr.get(i));
		}


	}
	

	public static String getFileNameFromTime() {
		SimpleDateFormat form = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		String strTime = form.format(System.currentTimeMillis());
		String pathname = strTime + ".png";

		return pathname;
	}

	public static BufferedImage getScreenShot() {
		BufferedImage screencapture = null;
		try {
			screencapture = new Robot().createScreenCapture(new Rectangle(Toolkit.getDefaultToolkit().getScreenSize()));
		} catch (HeadlessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AWTException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return screencapture;
	}

	public static void saveImg(String fileName, BufferedImage screencapture) {
		File file = null;

//		화면캡쳐하는 부분
		try {
			// 전체 화면 Capture

			// 이미지저장
			file = new File(fileName);
			ImageIO.write(screencapture, "png", file);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
