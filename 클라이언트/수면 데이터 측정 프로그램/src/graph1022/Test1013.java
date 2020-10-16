package graph1022;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
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
////
public class Test1013 {

	// �̹��� ���� ��� �迭
	public static ArrayList<String> arrPath = new ArrayList<String>();

	// �� �뿪�� ������ ���� �迭
	public static ArrayList<Integer> arrDELTA = new ArrayList<Integer>();
	public static ArrayList<Integer> arrTHETA = new ArrayList<Integer>();
	public static ArrayList<Integer> arrALPHA = new ArrayList<Integer>();
	public static ArrayList<Integer> arrBETA = new ArrayList<Integer>();
	public static ArrayList<Integer> arrGAMMA = new ArrayList<Integer>();

	public static void main(String[] args) {
		// �����ʱ�ȭ
		String fileName = "data1013";
		
		System.out.println(fileName);

		// 1. ���ϸ���� �д´�.
		// ���ϸ��� �д´�.
		// ������ �޾Ƽ� ���� ������

		String path = "C:\\git\\JavaWorkspace\\�̹��� ����\\"+fileName;
		File dirFile = new File(path);
		File[] fileList = dirFile.listFiles();
		for (File tempFile : fileList) {
			if (tempFile.isFile()) {
				String tempFileName = tempFile.getPath();
				arrPath.add(tempFileName);
//				break;
			}
		}

		// ���� �����鼭 ����Ŀ� �����ϱ�
		for (int i = 0; i < arrPath.size(); i++) {
			hello(i);
		}
		
		System.out.println(arrALPHA.size());
		

		saveArrFile(arrDELTA, "arrDELTA" + fileName);
		saveArrFile(arrTHETA, "arrTHETA" + fileName);
		saveArrFile(arrALPHA, "arrALPHA" + fileName);
		saveArrFile(arrBETA, "arrBETA" + fileName);
		saveArrFile(arrGAMMA, "arrGAMMA" + fileName);
		
		
//		// ���� �����鼭 ����Ŀ� �����ϱ�
//		for (int i = 0; i < 5; i++) {
//			if(i==4) {
//				hello(1000*i, arrPath.size());
//			}
//			else {
//
//				hello(1000 * i, 1000 * i + 1000);
//			}
//		}

		// ��... 0�϶� ���� �ڵ鸵�� ���؇J��...

//		ArrayList<Integer> temp = loadArrFile("arrDELTA");
//		for(int i : temp) {
//			System.out.println(i);
//		}
//		

		// �����ɷ� �׷��� �׸���
//		graph.drawGraph(arrDELTA, 100, "Delta");

	}
	public static void hello(int i) {
		System.out.println(i + "] " + arrPath.get(i) + "ó����...");

		ArrayList<Integer> temp = new ArrayList<Integer>();
		Image img = Test1012.getImageFromFile(arrPath.get(i));
		BufferedImage bi = Test1012.toBufferedImage(img);

		temp = Test1012.test1013support(bi);

		arrDELTA.add(temp.get(0));
		arrTHETA.add(temp.get(1));
		arrALPHA.add(temp.get(2));
		arrBETA.add(temp.get(3));
		arrGAMMA.add(temp.get(4));
	}

	public static void hello(int start, int end) {

		for (int i = start; i < end || (start == 4000 && i < arrPath.size()); i++) {

			System.out.println(i + "] " + arrPath.get(i) + "ó����...");

			ArrayList<Integer> temp = new ArrayList<Integer>();
			Image img = Test1012.getImageFromFile(arrPath.get(i));
			BufferedImage bi = Test1012.toBufferedImage(img);

			temp = Test1012.test1013support(bi);

			arrDELTA.add(temp.get(0));
			arrTHETA.add(temp.get(1));
			arrALPHA.add(temp.get(2));
			arrBETA.add(temp.get(3));
			arrGAMMA.add(temp.get(4));
		}

		// ������ ��� ���̽����� �ٲٰ� ���Ϸ� �����ϱ�
//		System.out.println(arr2JSON(arrDELTA)); 

		saveArrFile(arrDELTA, "arrDELTA" + start);
		saveArrFile(arrTHETA, "arrTHETA" + start);
		saveArrFile(arrALPHA, "arrALPHA" + start);
		saveArrFile(arrBETA, "arrBETA" + start);
		saveArrFile(arrGAMMA, "arrGAMMA" + start);

		// �迭 �ʱ�ȭ
		arrDELTA.clear();
		arrTHETA.clear();
		arrALPHA.clear();
		arrBETA.clear();
		arrGAMMA.clear();

	}

	public static void saveArrFile(ArrayList<Integer> arr, String fileName) {
		try {

			String data = Test1012.intArr2JSON(arr).toJSONString();

			// ���� ��ü ����
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

		// myJson.json������ �о�� Object�� �Ľ�

		Object obj;
		try {
			obj = parser.parse(new FileReader(filePath + ".json"));

			JSONObject jsonObject = (JSONObject) obj;
			System.out.println(jsonObject);

			// list��������
			JSONArray msgList = (JSONArray) jsonObject.get("BpData");
			Iterator<Long> iterator = msgList.iterator();
			System.out.println("**JsonList**");

			while (iterator.hasNext()) {
				res.add(Integer.parseInt(iterator.next().toString()));
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
