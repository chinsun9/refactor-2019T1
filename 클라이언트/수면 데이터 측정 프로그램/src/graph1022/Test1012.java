package graph1022;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import org.json.simple.JSONObject;

public class Test1012 {
	final static int width = 716; // 8ĭ
	final static int height = 202; // -1�� ������Ѵ�! ��ŸƮ �ȼ��� ����
	final static int startX = 51;
	final static int startY = 341;
	final static int secondY = startY + height + 1; // �ι�° �̹��� ���� Y
	final static int tol = 70;
	static ArrayList<Integer> data = new ArrayList<Integer>(width);

	//////// ���� �߰��� �κ�/////////////
	final static int tolLine = 10;
	final static int bpStartX = 1030;
	final static int bpStartY = 608;
	final static int bpWidth = 858;
	final static int bpHeight = 339;
	final static int bpinterval = 858 / 5;
	
    static String urls = "http://192.9.45.177:65005/ganglion/analysis/index";
	//////// ���� �߰��� �κ�/////////////

    public static ArrayList<Integer> test1013support (BufferedImage bi) {
    	ArrayList<Integer> resArr = new ArrayList<Integer>();
    	
    	BufferedImage cropImg = cropImage(bi, bpStartX, bpStartY, bpWidth, bpHeight);
		getColor(cropImg, 3);
		resArr = getBpValue(cropImg);
    	
    	return resArr;
    }
    
	public static void main(String[] args) throws Exception {

		// �����о �����ϱ� �������ϱ�..
		Image img = getImageFromFile("sample 3layout.png");
		BufferedImage bi = toBufferedImage(img);
		
		
		
		
		
		
		

		//////// ���� �߰��� �κ�/////////////
		BufferedImage cropImg = cropImage(bi, bpStartX, bpStartY, bpWidth, bpHeight);
		getColor(cropImg, 3);
		getBpValue(cropImg);
		//////// END OF ���� �߰��� �κ�/////////////
		
		
		
		
		
		

		ImageIO.write(cropImg, "png", new File("setbp.png"));

	}

	public static void showData() {

		graph.main(data);
	}

	// ���� 1 ; ����� / 2 ; �Ķ��� / 3 ; ����Ŀ�
	public static void getColor(BufferedImage image, int mode) {
		int width = image.getWidth();
		int height = image.getHeight();

		for (int w = 0; w < width; w++) {
			for (int h = 0; h < height; h++) {

				Color ori = new Color(image.getRGB(w, h));
				int r = ori.getRed();
				int g = ori.getGreen();
				int b = ori.getBlue();

				switch (mode) {

				case 1:

//					�����
//					184,160,193 ; ���ѻ�
//					124,75,141 ; ���ѻ�
//					167, 142, 175

//					if ((r == 184 || r == 124) && (g == 160 || g == 75) && (b == 193 || b == 141)) {
					if (r <= 210 + tolLine && r >= 210 - tolLine && g <= 210 + tolLine && g >= 210 - tolLine
							&& b <= 210 + tolLine && b >= 210 - tolLine) { // ȸ���� ����
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					} else
						;
					break;

				case 2:

//					�Ķ���
//					149,166,201 ; ���ѻ�
//					54,87,158 ; ���ѻ�

					if (r <= 210 + tolLine && r >= 210 - tolLine && g <= 210 + tolLine && g >= 210 - tolLine
							&& b <= 210 + tolLine && b >= 210 - tolLine) { // ȸ���� ����
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					} else if ((r <= 149 + tol && r >= 54 - tol) && (g <= 166 + tol && g >= 87 - tol)
							&& (b <= 201 + tol && b >= 158 - tol)) {
//						System.out.println("�ȼ� ��ġ2 : " + w + ", " + h);

						if (data.get(w) == 0) {
							data.add(w, h);
						}

					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;

					
					
					
					
					
					
					
					////////////// �����߰��� �κ� /////////////
				case 3:
					if (r <= 210 + tolLine && r >= 210 - tolLine && g <= 210 + tolLine && g >= 210 - tolLine
							&& b <= 210 + tolLine && b >= 210 - tolLine) { // ȸ���� ����
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					} else if (((r <= 149 + tol && r >= 54 - tol) && (g <= 166 + tol && g >= 87 - tol)
							&& (b <= 201 + tol && b >= 158 - tol))
							|| ((r <= 235 + tol && r >= 235 - tol) && (g <= 203 + tol && g >= 203 - tol)
									&& (b <= 105 + tol && b >= 105 - tol))) {
					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;
					////////////// END OF �����߰��� �κ� /////////////
				}
			}
		}
	}
	
	

	
	
	
	///////////////////////// �����߰��� �κ� //////////////////////////
	// ����Ŀ����� �� �����ϱ�
	public static ArrayList<Integer> getBpValue(BufferedImage img) {
		ArrayList<Integer> arr = new ArrayList<Integer>();

		for (int i = 0; i < 5; i++) {
//			System.out.println(bpinterval * (i + 1) - bpinterval / 2);

			arr.add(i, 0);
			for (int y = 0; y < img.getHeight(); y++) {
				// 0�ϋ� �������� ���� �־ �ʱ�ȭ �������.
				Color ori = new Color(img.getRGB(bpinterval * (i + 1) - bpinterval / 2, y));

				// ����� �ƴϸ�!
				if (!(ori.getBlue() == 255 && ori.getRed() == 255 && ori.getGreen() == 255)) {

					arr.add(i, (int)((float) (img.getHeight() - y) / img.getHeight() * 100));
					break;
				}
			}
		}
		return arr;

//		for (int i = 0; i < arr.size(); i++) {
//			System.out.println(arr.get(i));
//		}

//		System.out.println(arr2JSON(arr).toJSONString());
		
//		String postData = arr2JSON(arr).toJSONString();
		

//        post(urls, postData);
		
	}

	public static JSONObject arr2JSON(ArrayList<Float> arr) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("BpData", arr);

		return jsonObject;
	}

	public static JSONObject intArr2JSON(ArrayList<Integer> arr) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("BpData", arr);

		return jsonObject;
	}
	public static JSONObject floatArr2JSON(ArrayList<Float> arr) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("BpData", arr);

		return jsonObject;
	}
	///////////////////////// END OF �����߰��� �κ� //////////////////////////
	
	
	
	
	
	
	
	
	// �̹��� �ڸ���
	public static BufferedImage cropImage(BufferedImage src, int x, int y, int w, int h) { // ���� , ����x, ����y, width,
																							// height
		BufferedImage dest = src.getSubimage(x, y, w, h);
		return dest;
	}

	// �̹��� ���Ͽ��� �б�
	public static Image getImageFromFile(String path) {
		Image image = null;
		try {
			image = ImageIO.read(new File(path));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return image;
	}

	// �̹����� ���޵��̹����� ��ȯ
	public static BufferedImage toBufferedImage(Image img) {
		if (img instanceof BufferedImage) {
			return (BufferedImage) img;
		}

		// Create a buffered image with transparency
		BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);

		// Draw the image on to the buffered image
		Graphics2D bGr = bimage.createGraphics();
		bGr.drawImage(img, 0, 0, null);
		bGr.dispose();

		// Return the buffered image
		return bimage;
	}

	
	public static void post(String strUrl, String jsonMessage){
        try {
            System.out.println("���� ������");
            URL url = new URL(strUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("POST");

            //json���� message�� �����ϰ��� �� ��
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoInput(true);
            con.setDoOutput(true); //POST �����͸� OutputStream���� �Ѱ� �ְڴٴ� ����
            con.setUseCaches(false);
            con.setDefaultUseCaches(false);

            OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
            wr.write(jsonMessage); //json ������ message ����
            wr.flush();
            
            StringBuilder sb = new StringBuilder();
            //�޾ƿ� ������ ���
            if (con.getResponseCode() == HttpURLConnection.HTTP_OK) {
                //Stream�� ó������� �ϴ� �������� ����.
                BufferedReader br = new BufferedReader(
                        new InputStreamReader(con.getInputStream(), "utf-8"));
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line+"\n");
                }
                br.close();
                System.out.println("" + sb.toString());
            }
            

            

        } catch (Exception e){
            System.err.println(e.toString());
        }
    }
}
