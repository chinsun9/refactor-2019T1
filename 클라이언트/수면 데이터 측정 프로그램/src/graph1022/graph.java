package graph1022;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.ArrayList;

class graph extends Frame {
//
//	final static int width = 716; // 8ĭ
//	final static int height = 201;
//	static ArrayList<Integer> data;

	static int width = 0;
	static int height = 0;
	static ArrayList<Integer> data;
	static Color col;

	public graph(String title, int width, int height, ArrayList<Integer> ori, Color col, int lineNum) {
		super(title);

//		data = new ArrayList<Integer>(width);
		data = ori;
		System.out.println(data.size());
		this.width = width;
		this.height = height;

		System.out.println(lineNum);
		
		this.col = col;

		add(new XCanvas());
		setSize(width, (height + 40) * lineNum); 
		setVisible(true);
		this.addWindowListener(new WindowAdapter() { 
			public void windowClosing(WindowEvent e) { 
				System.exit(0); 
			}
		});

	}

	public static void main(ArrayList<Integer> ori) {
		new graph("�׷���", width, height, ori, Color.red, 1);
	}

	public static void drawGraph(ArrayList<Integer> ori, int height, String graphName, Color col, int lineNUm) {
		new graph(graphName, ori.size(), height, ori, col, lineNUm);

	}

	class XCanvas extends Canvas {
		int preY = 0;
		int printX = 0;

		public void paint(Graphics g) {
			g.setColor(Color.blue);
			g.drawLine(0, 100, width, 100);
			g.drawLine(0, 220, width, 220);
			
			

			g.setColor(col);
			for (int x = 0; x < width; x++) {
				int y = height - data.get(x);

				if (x > 1920 * 4) {
					y += 120 * 4;
					printX = x - 1920 * 4;

					if (x == 1920 * 4)
						printX = 0;
				}
				else if (x > 1920 * 3) {
					y += 120 * 3;
					printX = x - 1920 * 3;

					if (x == 1920 * 3)
						printX = 0;
				}
				else if (x > 1920 * 2) {
					y += 120 * 2;
					printX = x - 1920 * 2;

					if (x == 1920 * 2)
						printX = 0;
				} else if (x > 1920) {

					y += 120;
					printX = x - 1920;

					if (x == 1921)
						printX = 0;
				}

				else {
					printX = x;
				}

				g.drawLine(printX - 1, preY, printX, y);
				preY = y;
			}

		}

	}
}