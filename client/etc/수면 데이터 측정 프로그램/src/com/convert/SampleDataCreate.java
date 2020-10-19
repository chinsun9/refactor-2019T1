package com.convert;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class SampleDataCreate {

	public static ArrayList[] arrBP = new ArrayList[5];

	public static void main(String[] args) {
		System.out.println("내 측정 수면데이터를 샘플데이터를 바꾸는 과정");
		for (int i = 0; i < arrBP.length; i++) {
			arrBP[i] = new ArrayList<Float>();
		}

		Boolean flag = true;
		flag = false;

		// json불러오기
		String filePath = "2019-10-26 01-16-48.json";
		loadArrFile(filePath);
		
		// json 파일명으로부터 추출
		String date_s = filePath.substring(0, 19);	//.json앞까지 파싱
		System.out.println(date_s);
		

		
		
		SimpleDateFormat dt = new SimpleDateFormat("yyyyy-MM-dd HH-mm-ss"); 
		Date date=null;
		try {
			date = dt.parse(date_s);
		} catch (java.text.ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} 

		// 변환작업

		// 날짜구하기
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.SECOND, 2);


		System.out.println(cal.getTime());
		if (flag) {
			return;
		}
		
		//Sat Oct 26 2019 18:33:13 GMT+0900 (GMT+09:00)$
		SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss", new Locale("en", "US"));
		

//		System.out.println(arrBP[0].size());
		

		String res = "";	//결과값
		for (int i = 0; i < arrBP[0].size(); i += 2) {
			for (int j = 0; j < arrBP.length; j++) {
				res += arrBP[j].get(i) + ",";
			}
			String suffix = sdf.format(cal.getTime())+" GMT+0900 (GMT+09:00)$\n";
			res += suffix;
			cal.add(Calendar.SECOND, 2);		//2초더하기
		}
		
//		System.out.println(res);

		// 파일저장
		
		try {
		    OutputStream output = new FileOutputStream(filePath+".txt");
		    String str = res;
		    byte[] by=str.getBytes();
		    output.write(by);
				
		} catch (Exception e) {
	            e.getStackTrace();
		}
		System.out.println("저장완료");
		
		
	}

	public static void printArr() {

		for (int j = 0; j < arrBP.length; j++) {

			for (int i = 0; i < arrBP[0].size(); i++) {
				System.out.print(arrBP[j].get(i) + " ");
			}
			System.out.println();
		}
	}

	@SuppressWarnings("unchecked")
	public static void loadArrFile(String filePath) {

		final String arrName[] = { "DELTA", "THETA", "ALPHA", "BETA", "GAMMA" };
		JSONParser parser = new JSONParser();

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
				Iterator<Double> iterator = arr.iterator(); // long을 써줘야한다람쥐..

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
	}

}
