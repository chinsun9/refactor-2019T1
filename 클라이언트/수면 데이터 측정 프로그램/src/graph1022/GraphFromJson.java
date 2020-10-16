package graph1022;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.ArrayList;

class GraphFromJson extends Frame {

//	int width = 716; // 8ĭ
//	int height = 201;
	
	public GraphFromJson(String title, int height, ArrayList<Integer> ori) {
		// json ��ü�� �޾Ƽ�
		// �׷����� �پ��ش�.
		// �׷����� �ٿ� �����ٷ��� width, heigh ũ�⸦ �����ͼ� �����ϰ� â�� �ٿ����Ѵ�.
		super(title);


		int width = ori.size(); // windth�� ����Ʈ�� �������̴�.
		ArrayList<Integer> data = new ArrayList<Integer>(width);
		
		for (int i = 0; i < width; i++) {
			data.add(ori.get(i));
		}

		
		add(new XCanvas(data, height));
		setSize(width + 20, height + 20); // �������� ũ�� ����
		setVisible(true);
		
		this.addWindowListener(new WindowAdapter() { // �ݱ�â Ȱ��ȭ
			public void windowClosing(WindowEvent e) { // �ݱ�â�� Ŭ���ϸ�
				System.exit(0); // ����
			}
		});
	}

	public static void main(ArrayList<Integer> ori) {
//		new GraphFromJson("�׷���", width, height, ori);
		System.out.println("main");
	}

	class XCanvas extends Canvas {
//		ĵ���� �⺻ ����
		int width;
		int height;
		ArrayList<Integer> data;
		
		
		
//		Ư¡ ���� ���� ����
		int y;

		int flagX;
		int flagY;

		int countP;
		int countN;

		int startF;
		int endF;
		
		int axisX;
		
	
		public XCanvas(ArrayList<Integer> data, int height) {
			this.data = data;
			this.width = data.size();
			this.height = height;
			
		}

		public void paint(Graphics g) {

			g.drawLine(0, 100, width, 100); // x�� ���(0,300���� 500,300���� �׸���.)
			g.drawLine(0, 100 - 30, width, 100 - 30); // x�� ���(0,300���� 500,300���� �׸���.)
			g.drawLine(0, 100 + 30, width, 100 + 30); // x�� ���(0,300���� 500,300���� �׸���.)

			g.setColor(new Color(0f, 0f, 0f, 0.1f));
			for(int i=0;i<width;i+=50) {
				g.drawLine(i, 0, i, 200);
			}
			
			g.setColor(Color.red); // ���� ������ blue�� ����
			for (int x = 0; x < width; x++) {
				y = data.get(x);
				g.drawLine(x, y, x, y); // ���

				if (y == 100) { // Ư¡ ���κ� üũ
					g.setColor(Color.blue);
					g.drawRect(x - 5, y - 5, 10, 10);
					g.setColor(Color.red);
					flagX = x;

					if (x - flagY <= 100 && isEnd()) {
						g.setColor(Color.green);
						g.drawLine(x, 0, x, 200);
						g.setColor(Color.red);
						endF = x;
					}
				} else if (y == 70) { // Ư¡ ���Ժ�

					g.setColor(Color.cyan);
					g.drawRect(x - 5, y - 5, 10, 10);
					g.setColor(Color.red);
					countP++;

					if (x - flagX <= 50) {
						g.drawLine(flagX, 0, flagX, 200);
						startF = flagX;

					}
				} else if (y == 130) {

					g.setColor(Color.cyan);
					g.drawRect(x - 5, y - 5, 10, 10);
					g.setColor(Color.red);
					countN++;

					flagY = x;
					if (x - flagX <= 50) {
//						g.setColor(Color.pink);
//						g.drawLine(flagX, 0, flagX, 200);
//						g.setColor(Color.red);
					}
				}

			}

			System.out.println("Ư¡ ���� x ; " + startF);
			System.out.println("Ư¡ �� x ; " + endF);

		}

		boolean isEnd() {
			if (countP >= 2 && countN >= 2) {
				countP = 0;
				countN = 0;
				return true;
			}
			return false;
		}
	}
}