package test;

import java.awt.Color;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;

import javax.imageio.ImageIO;

public class Main {

//	��� ����
	final static int width = 716; // 8ĭ
	final static int height = 201;

	final static int startX = 52;
	final static int startY = 346;

	final static int secondY = startY + height + 1; // �ι�° �̹��� ���� Y

	final static int tol = 10;

	static ArrayList<Integer> data = new ArrayList<Integer>(width);

	public static void main(String[] args) throws Exception {
//		1. ����
//		2. ���� ���� �ڸ���
//		3. ���� ������ Ư�� ���� ����, ������ ��� �����
//		4. ����
		
		for(int i = 0;i<width;i++) {
			data.add(0);
		}

		Robot robot = new Robot(); // �������
		BufferedImage bi = robot.createScreenCapture(new Rectangle(1920, 1080));

//		�����
		BufferedImage cropImg = cropImage(bi, startX, startY, width, height);
		getColor(cropImg, 1);
		ImageIO.write(cropImg, "png", new File("set.png"));

//		 �Ķ���
		cropImg = cropImage(bi, startX, secondY, width, height);
		getColor(cropImg, 2);
		ImageIO.write(cropImg, "png", new File("set1.png"));
		
		showData();

	}

	public static void showData() {

		graph.main(data);
	}

	// ���� 1-����� / 2-�Ķ���
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
					if ((r <= 184 + tol && r >= 124 - tol) && (g <= 160 + tol && g >= 75 - tol)
							&& (b <= 193 + tol && b >= 141 - tol)) {
//						System.out.println("�ȼ� ��ġ : " + w + ", " + h);


					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;

				case 2:

//					�Ķ���
//					149,166,201 ; ���ѻ�
//					54,87,158 ; ���ѻ�

					if ((r <= 149 + tol && r >= 54 - tol) && (g <= 166 + tol && g >= 87 - tol)
							&& (b <= 201 + tol && b >= 158 - tol)) {
//						System.out.println("�ȼ� ��ġ2 : " + w + ", " + h);

						if (data.get(w) == 0) {
							data.add(w, h);
						}

						
					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;
				}
			}
		}
	}

	// �̹��� �ڸ���
	public static BufferedImage cropImage(BufferedImage src, int x, int y, int w, int h) { // ���� , ����x, ����y, width,
																							// height
		BufferedImage dest = src.getSubimage(x, y, w, h);
		return dest;
	}

}
