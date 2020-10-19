package record_open_bci_with_json;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.util.ArrayList;

import org.json.simple.JSONObject;


// 이미지를 받으면
//관심영역 짜르고
//값추출하고
//배열을 반환

public class Img2JsonData {
	final static int tol = 70;
	final static int tolLine = 10;
	final static int bpStartX = 1030;
	final static int bpStartY = 609;
	final static int bpWidth = 858;
	final static int bpHeight = 339;
	final static int bpinterval = 858 / 5;

	public static ArrayList<Byte> getBandPower(BufferedImage bi) {

		BufferedImage cropImg = cropImage(bi, bpStartX, bpStartY, bpWidth, bpHeight);
		getColor(cropImg, 3);
		return getBpValue(cropImg);

	}

	public static ArrayList<Byte> test1013support(BufferedImage bi) {
		ArrayList<Byte> resArr = new ArrayList<Byte>();

		BufferedImage cropImg = cropImage(bi, bpStartX, bpStartY, bpWidth, bpHeight);
		getColor(cropImg, 3);
		resArr = getBpValue(cropImg);
		return resArr;
	}

	public static void getColor(BufferedImage image, int mode) {
		int width = image.getWidth();
		int height = image.getHeight();

		for (int w = 0; w < width; w++) {
			for (int h = 0; h < height; h++) {

				Color ori = new Color(image.getRGB(w, h));
				int r = ori.getRed();
				int g = ori.getGreen();
				int b = ori.getBlue();

				if (r <= 210 + tolLine && r >= 210 - tolLine && g <= 210 + tolLine && g >= 210 - tolLine
						&& b <= 210 + tolLine && b >= 210 - tolLine) {
					image.setRGB(w, h, new Color(255, 255, 255).getRGB());
				} else if (((r <= 149 + tol && r >= 54 - tol) && (g <= 166 + tol && g >= 87 - tol)
						&& (b <= 201 + tol && b >= 158 - tol))
						|| ((r <= 235 + tol && r >= 235 - tol) && (g <= 203 + tol && g >= 203 - tol)
								&& (b <= 105 + tol && b >= 105 - tol))) {
				} else {
					image.setRGB(w, h, new Color(255, 255, 255).getRGB());
				}

			}
		}
	}

	public static ArrayList<Byte> getBpValue(BufferedImage img) {
		ArrayList<Byte> arr = new ArrayList<Byte>(5);

		for (int i = 0; i < 5; i++) {
			Byte value = 0;
			for (int y = 0; y < img.getHeight(); y++) {
				Color ori = new Color(img.getRGB(bpinterval * (i + 1) - bpinterval / 2, y));
				if (!(ori.getBlue() == 255 && ori.getRed() == 255 && ori.getGreen() == 255)) {
					value = (byte) ((float) (img.getHeight() - y) / img.getHeight() * 100);
					break;
				}
			}
			arr.add(value);
		}
		return arr;

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

	public static BufferedImage cropImage(BufferedImage src, int x, int y, int w, int h) {
		BufferedImage dest = src.getSubimage(x, y, w, h);
		return dest;
	}
}
