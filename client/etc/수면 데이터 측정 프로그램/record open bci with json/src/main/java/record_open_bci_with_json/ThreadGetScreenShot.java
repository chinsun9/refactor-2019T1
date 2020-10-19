package record_open_bci_with_json;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class ThreadGetScreenShot implements Runnable {
	private int interval;
	public boolean flag;

	public ThreadGetScreenShot() {
		interval = 1000;
		flag = true;
	}

	public ThreadGetScreenShot(int input) {
		interval = input;
		flag = true;
	}

	public void stopCatureAndSaveJson() {

	}

	@Override
	public void run() {
		String fileName = getTime();
		System.out.println(fileName + ".json");

		ArrayList[] arrBP = new ArrayList[5];

		for (int i = 0; i < arrBP.length; i++) {
			arrBP[i] = new ArrayList<Byte>();
		}

		while (flag) {
			System.out.println(getTime() + "...");
			ScreenShot.goThread(arrBP);

			try {
				Thread.sleep(interval);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		// 메뉴에서 2를 누르면
		// 위 무한루프 탈출하고 어레이 json으로 저장

//		showBpData(arrBP);

		System.out.println("json 파일로 저장중...");

		String[] BpName = { "DELTA", "THETA", "ALPHA", "BETA", "GAMMA" };
		JSONObject data = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		for (int i = 0; i < arrBP.length; i++) {
			JSONObject jsonObject = intArr2JSON(BpName[i], arrBP[i]);
			jsonArray.add(jsonObject);
		}
		data.put("data", jsonArray);

		saveJsonFile(data, fileName);
		System.out.println("저장완료!");
	}

	public static String getTime() {
		SimpleDateFormat form = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		return form.format(System.currentTimeMillis());
	}

	public static void saveJsonFile(JSONObject jsonObject, String fileName) {
		try {

			String data = jsonObject.toJSONString();

			FileWriter file = new FileWriter(fileName + ".json");

			file.write(data);
			file.flush();
			file.close();
		} catch (FileNotFoundException e) {
			e.getStackTrace();
		} catch (IOException e) {
			e.getStackTrace();
		}
	}

	public static JSONObject intArr2JSON(String name, ArrayList<Integer> arr) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(name, arr);

		return jsonObject;
	}

	public static void showBpData(ArrayList[] arrBP) {
		for (int q = 0; q < arrBP.length; q++) {
			for (Object i : arrBP[q]) {
				System.out.println(i);
			}
		}
	}

//	public static void main(String[] args) {
//
//		int i = 5000;
//		System.out.println(i + "밀리초마다 스크린샷을 저장합니다");
//		ThreadGetScrrenShot ct = new ThreadGetScrrenShot(i);
//		Thread t = new Thread(ct, "첫번째");
//
//		t.start();
//	}
}