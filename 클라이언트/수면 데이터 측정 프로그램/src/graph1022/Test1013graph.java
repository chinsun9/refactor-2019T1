package graph1022;

import java.awt.Color;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

////
// 13�� ���鵥���� ����Ŀ����� ������ �����ϰ� �׷��� �׷�����
// json���Ϸ� �����ѰŸ� �ٽ��о �׷����� �׸��� ���α׷��̴�.
////
public class Test1013graph {

	public static ArrayList<String> arrPath = new ArrayList<String>();

	public static ArrayList[] arrBP = new ArrayList[5];
	public static ArrayList<Float> arr = new ArrayList<Float>();
	public static ArrayList<Float> arr2 = new ArrayList<Float>();

	public static final String arrName[] = { "DELTA", "THETA", "ALPHA", "BETA", "GAMMA" };

	public static ArrayList<Color> arrCol = new ArrayList<Color>();

	public static void main(String[] args) {
		// �Է��ض�.
		String fileName = "data\\2019-10-22 00-19-10.json";
		int idx = 4;

		for (int i = 0; i < arrBP.length; i++) {
			arrBP[i] = new ArrayList<Float>();
		}

		arrCol.add(new Color(133, 152, 194));
		arrCol.add(new Color(174, 145, 184));
		arrCol.add(new Color(130, 167, 153));
		arrCol.add(new Color(231, 206, 109));
		arrCol.add(new Color(233, 134, 127));

		System.out.println("test1022");

		loadArrFile(fileName);

		

		//알베와 베타, 쎄타와 알파, 차이 구하기
		for(int i=0;i<arrBP[2].size() ; i++) {

			float theta = times((float) arrBP[1].get(i));
			float alpha = times((float) arrBP[2].get(i));
			float beta = times((float) arrBP[3].get(i));
			float delta = times((float) arrBP[0].get(i));
			float gamma = times((float) arrBP[4].get(i));
			

			arr.add(delta/(theta+alpha+beta+gamma+delta)*100);
		}
		
		saveArrFile(arr, "delta-percent");
		
//		ArrayList<Integer> arr;
//		
//		arr = loadArrFile(fileName);
//		
//		int lineNum = arr.size()/1920 + 1;
//		System.out.println(lineNum);
//		
//
		
//		// 이것은 천장을 뚷는 제거 코그입니다 ///
//		for (int i = 0; i < arrBP.length; i++) {
//			for (int j = 0; j < arrBP[i].size(); j++) {
//
//				float f = (float) arrBP[i].get(j);
////				System.out.println(f);
//				if (f == 100) {
//					f = (float) arrBP[i].get(j-1);
//				}
//
//				arrBP[i].remove(j);
//				arrBP[i].add(j, f);
//
//			}
//		}
//
//		for (int i = 0; i < arrBP.length; i++) {
//			saveArrFile(arrBP[i], "a" + arrName[i]);
//		}
//		// 이것은 천장을 뚷는 제거 코그입니다///

	}
	
	public static float times(float res) {
//		if(res>=67) {
//			res*=100;
//		}
//		else if(res>=33) {
//			res*=10;
//		}
//		else {
//			;
//		}
		
		return res;
	}

	public static void saveArrFile(ArrayList<Float> arr, String fileName) {
		try {

			String data = Test1012.floatArr2JSON(arr).toJSONString();

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

	public static ArrayList<Integer> loadArrFile(String filePath) {
		JSONParser parser = new JSONParser();

		ArrayList<Integer> res = new ArrayList<Integer>();

		Object obj;
		try {
			obj = parser.parse(new FileReader(filePath));

			// json파일 읽기
			JSONObject jsonObject = (JSONObject) obj;

			// 각 배열에 저장

			for (int i = 0; i < arrBP.length; i++) {
				JSONArray msgList = (JSONArray) jsonObject.get("data");
				JSONObject set = (JSONObject) msgList.get(i);
				JSONArray arr = (JSONArray) set.get(arrName[i]);
				System.out.println(arr.size());
				Iterator<Double> iterator = arr.iterator();
				System.out.println("**JsonList**");

				while (iterator.hasNext()) {
					arrBP[i].add(Float.parseFloat(iterator.next().toString()));
				}
			}

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}

}
