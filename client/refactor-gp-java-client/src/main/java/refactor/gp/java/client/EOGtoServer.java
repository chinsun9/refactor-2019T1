package refactor.gp.java.client;

import java.awt.AWTException;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.HeadlessException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class EOGtoServer extends JFrame implements Runnable {
	final static int width = 716; // 8칸
	final static int height = 201;

	final static int startX = 52;
	final static int startY = 346;

	final static int secondY = startY + height + 1; // 두번째 이미지 시작 Y

	final static int tol = 10;
	final static int tol2 = 70;

	static int userNum = 1;
	static int userNumTest = 1;
	static String userStatus = "start";

	static int servercount = 0;

	static public int status = 0;
	static public boolean firstRegister = false;
	static public boolean setLogin = false;
	static public boolean judgeRegister = false;
	static JButton jb = new JButton("", new ImageIcon("resources/btnReg.png")); // 회원가입 버튼

	static String msg = "서버 통신 준비";

	// 성재 추가
	public static String SERVER_IP = "";

	static String urls = "http://" + SERVER_IP + ":65002/ganglion/login";
	// static String urls = "http://192.9.45.89:65002/ganglion/analysis/index";

	// static ArrayList list2x = new ArrayList<>();
	static ArrayList list2y = new ArrayList<>();
	// static ArrayList list3x = new ArrayList<>();
	static ArrayList list3y = new ArrayList<>();

	static String token = "";

	final static int tolLine = 10;
	final static int bpStartX = 1030;
	final static int bpStartY = 147; // 2레이아웃버전
	// final static int bpStartY = 609; //3레이아웃버전
	final static int bpWidth = 858;
	final static int bpHeight = 800; // 2레이아웃버전
	// final static int bpHeight = 339; //3레이아웃버전
	final static int bpinterval = bpWidth / 5;

	// 일회용 내 데탑 버전 //

	// END OF 일회용 내 데탑 버전 //

	static int minusY = -60;
	static int minusX = -30;

	JPanel jp = new JPanel() {
		public void paintComponent(Graphics g) {
			g.drawImage(new ImageIcon("resources/back2.png").getImage(), 0, 0, null);
			setOpaque(false); // 그림을 표시하게 설정,투명하게 조절
			super.paintComponent(g);
		}
	};

	JButton jb_out = new JButton("", new ImageIcon("resources/btnLogout.png")); // 로그 아웃 버튼 초기화
//	JButton jb_changeIP = new JButton("", new ImageIcon("btn_apply.png")); // 로그 아웃 버튼 초기화
	static JTextArea jl = new JTextArea(SERVER_IP);
	static JTextArea ja = new JTextArea("로그인 요청중");
	JScrollPane scrollPane = new JScrollPane(ja);

	public EOGtoServer() throws HeadlessException, AWTException {
		super("Lucid Java App"); // JFrame의 생성자에 값을 입력하면 윈도창에 해당 값이 입력됩니다.
		ActionListener button_action = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				if (judgeRegister == false) {
					urls = "http://" + SERVER_IP + ":65002/ganglion/index";
					ja.setText(ja.getText() + "\n회원가입 요청..");
//                    jb.setText("토큰 복사");
					jb.setIcon(new ImageIcon("resources/btnCopyT.png"));
					judgeRegister = true;
				} else {
					Toolkit toolkit = Toolkit.getDefaultToolkit();
					Clipboard clipboard = toolkit.getSystemClipboard();
					StringSelection strSel = new StringSelection(token);
					clipboard.setContents(strSel, null);
				}
				jp.requestFocus();
				jp.setFocusable(true);
			}
		};
		ActionListener button_action_logout = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				// chs ; 로그인도 안됫는데 로그아웃버튼 누르면 서버 튕기는 문제
				if (userStatus == "start") {
					System.out.println("바로종료해버리기");
					System.exit(0);// 그냥 포스트 안보내고 바로 종료해버리기
				}
				System.out.println(userStatus);

				urls = "http://" + SERVER_IP + ":65002/ganglion/analysis/index";
				userStatus = "stop";
				ja.setText(ja.getText() + "\n로그아웃 요청..");
				jp.requestFocus();
				jp.setFocusable(true);
			}
		};
		ActionListener button_change_ip = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				SERVER_IP = jl.getText();
				System.out.println(SERVER_IP + "");
				ja.setText(ja.getText() + "\n" + SERVER_IP);
			}
		};
		jp.addKeyListener(new KeyAdapter() {
			@Override
			public void keyTyped(KeyEvent e) {
				super.keyTyped(e);
			}

			@Override
			public void keyPressed(KeyEvent e) {
				String s = e.getKeyText(e.getKeyCode());
				if (e.getKeyCode() == KeyEvent.VK_1) {
					userNum = 1;
					userNumTest = 1;
				} else if (e.getKeyCode() == KeyEvent.VK_2) {
					userNum = 2;
					userNumTest = 2;
				} else if (e.getKeyCode() == KeyEvent.VK_3) {
					userNum = 3;
					userNumTest = 3;
				} else if (e.getKeyCode() == KeyEvent.VK_4) {
					userNum = 4;
					userNumTest = 4;
				} else if (e.getKeyCode() == KeyEvent.VK_5) {
					userNum = 5;
					userNumTest = 5;
				} else if (e.getKeyCode() == KeyEvent.VK_6) {
					userNum = 6;
					userNumTest = 6;
				} else if (e.getKeyCode() == KeyEvent.VK_7) {
					userNum = 7;
					userNumTest = 7;
				} else if (e.getKeyCode() == KeyEvent.VK_8) {
					userNum = 8;
					userNumTest = 8;
				} else if (e.getKeyCode() == KeyEvent.VK_9) {
					userNum = 9;
					userNumTest = 9;
				} else {
					// 다른키입력일 경우 포트트 보내면 안됨!
					System.out.println("허용되지 않는키");
					return;
				}
				setLogin = true;
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("userNum", userNum);
				urls = "http://" + SERVER_IP + ":65002/ganglion/logintest";
				jb.setIcon(new ImageIcon("resources/btnReg.png"));
				post(urls, jsonObject.toJSONString());

			}

			@Override
			public void keyReleased(KeyEvent e) {
				super.keyReleased(e);
			}
		});

		jp.setLayout(null);
		ja.setEditable(false);
		jb.addActionListener(button_action);
		jb_out.addActionListener(button_action_logout);
		jl.setBounds(20, 20, 200, 34);
//        jl.setRows(1);
		jl.setFont(new Font("arial", Font.PLAIN, 30));
		jp.add(jl);
		jb.setBounds(50 + minusX, 150 + minusY, 100, 50);
		jp.add(jb); // jp라는 패널에 jb라는 버튼 추가
		jb_out.setBounds(150 + minusX, 150 + minusY, 100, 50);
		jp.add(jb_out); // jp라는 패널에 jb라는 버튼 추가

//		jb_changeIP.setBounds(220, 20, 61, 34);
//		jb_changeIP.addActionListener(button_change_ip);
//		jp.add(jb_changeIP); // jp라는 패널에 jb라는 버튼 추가

		ja.setBounds(50 + minusX, 200, 500, 500);

		scrollPane.setBounds(50 + minusX, 200 + minusY, 250, 300);
		jp.add(scrollPane);
		add(jp); // JFrame에 jp라는 패널 추가
		jp.setFocusable(true);

		setSize(500, 500); // 윈도우의 크기 가로x세로
		setVisible(true); // 창을 보여줄떄 true, 숨길때 false
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // x 버튼을 눌렀을때 종료

	}

	public static void main(String[] args) throws Exception {

//		Robot robot = new Robot(); // 스샷찍는
//		BufferedImage bi = robot.createScreenCapture(new Rectangle(1920, 1080));

		// 텍스트 파일에서 서버 ip 읽어서 초기화하기
		File file = new File("lucid.txt"); // 리플레이할 수면 데이터 파일
		FileReader filereader = new FileReader(file);
		BufferedReader bufReader = new BufferedReader(filereader);
		String line = "";

		// 1단계 파일 생성 리퀘스트 보내기
		line = bufReader.readLine(); // 첫쨰줄 읽어서 만들기
		SERVER_IP = line;
		bufReader.close();
		System.out.println("서버아이피" + SERVER_IP);
		urls = "http://" + SERVER_IP + ":65002/ganglion/login";
		jl.setText(SERVER_IP);

		// 스레드 실행
		EOGtoServer ca = new EOGtoServer();
		Thread t = new Thread(ca, "실행");
		t.start();

	}

	public static void getColor(BufferedImage image, int mode) {
		int width = image.getWidth();
		int height = image.getHeight();
		for (int w = 0; w < width; w++) {
			int count = 0;
			int min_h = 0;
			int max_h = 0;
			for (int h = 0; h < height; h++) {
				Color ori = new Color(image.getRGB(w, h));
				int r = ori.getRed();
				int g = ori.getGreen();
				int b = ori.getBlue();

				switch (mode) {

				case 1:

//               보라색
//               184,160,193 ; 연한색
//               124,75,141 ; 진한색
//               167, 142, 175

					if ((r <= 184 + tol && r >= 124 - tol) && (g <= 160 + tol && g >= 75 - tol)
							&& (b <= 193 + tol && b >= 141 - tol)) {
						if (count == 0)
							min_h = h;
						else
							max_h = h;
						count++;
						// System.out.println("픽셀 위치 : " + w + ", " + h);
					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;

				case 2:

//               파란색
//               149,166,201 ; 연한색
//               54,87,158 ; 진한색

					if ((r <= 149 + tol && r >= 54 - tol) && (g <= 166 + tol && g >= 87 - tol)
							&& (b <= 201 + tol && b >= 158 - tol)) {
						// System.out.println("픽셀 위치2 : " + w + ", " + h);
						if (count == 0)
							min_h = h;
						else
							max_h = h;
						count++;
					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;

				case 3:
					if (r <= 210 + tolLine && r >= 210 - tolLine && g <= 210 + tolLine && g >= 210 - tolLine
							&& b <= 210 + tolLine && b >= 210 - tolLine) { // 회색선 제거
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					} else if (((r <= 149 + tol2 && r >= 54 - tol2) && (g <= 166 + tol2 && g >= 87 - tol2)
							&& (b <= 201 + tol2 && b >= 158 - tol2))
							|| ((r <= 235 + tol2 && r >= 235 - tol2) && (g <= 203 + tol2 && g >= 203 - tol2)
									&& (b <= 105 + tol2 && b >= 105 - tol2))) {
					} else
						image.setRGB(w, h, new Color(255, 255, 255).getRGB());
					break;

				}

			}
			double avg_h = 0;
			if (max_h != 0)
				avg_h = (min_h + max_h) / 2;
			else
				avg_h = min_h;
			if (mode == 1) {
				if (count != 0) {
					// list2x.add(w);
					list2y.add(avg_h);
				}
			} else {
				if (count != 0) {
					// list3x.add(w);
					list3y.add(avg_h);
				}
			}
		}

	}

	public static void getBpValue(BufferedImage img) {
		ArrayList<Float> arr = new ArrayList<Float>();

		for (int i = 0; i < 5; i++) {
			float value = 0;
			for (int y = 0; y < img.getHeight(); y++) {
				Color ori = new Color(img.getRGB(bpinterval * (i + 1) - bpinterval / 2, y));
				if (!(ori.getBlue() >= 240 && ori.getRed() >= 240 && ori.getGreen() >= 240)) {
					value = ((float) (img.getHeight() - y) / img.getHeight() * 100);
//               System.out.println(y+" "+value);
					break;

				}
			}
			arr.add(value);
		}

//        for (int i = 0; i < arr.size(); i++) {
//            System.out.println(arr.get(i));
//        }

//        System.out.println(arr2JSON(arr).toJSONString());

		String postData = arr2JSON(arr).toJSONString();
		// 친성 ; 여기다

		post(urls, postData);

	}

	public static JSONObject arr2JSON(ArrayList<Float> arr) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("BpData", arr);
		jsonObject.put("userNum", userNum);
		jsonObject.put("status", userStatus);

		return jsonObject;
	}

	@Override
	public void run() {
		while (status == 0)
			try {
				// 스레드 주기
				Thread.sleep(1500);
				Robot robot = new Robot(); // 스샷찍는
				BufferedImage bi = robot.createScreenCapture(new Rectangle(1920, 1080));

//      보라색
				if (urls.equals("http://" + SERVER_IP + ":65002/ganglion/analysis/index")) {
					BufferedImage cropImgs = cropImage(bi, bpStartX, bpStartY, bpWidth, bpHeight);
					getColor(cropImgs, 3);
					getBpValue(cropImgs);
				} else {
					BufferedImage cropImg = cropImage(bi, startX, startY, width, height);
					getColor(cropImg, 1);

					// ImageIO.write(cropImg, "png", new File("./img/set" + servercount + ".png"));

//       파란색
					cropImg = cropImage(bi, startX, secondY, width, height);
					getColor(cropImg, 2);
					// ImageIO.write(cropImg, "png", new File("./img/setb" + servercount + ".png"));
					JSONObject pixelObject = new JSONObject();
					// pixelObject.put("TwoX", list2x);
					pixelObject.put("TwoY", list2y);
					// pixelObject.put("ThreeX", list3x);
					pixelObject.put("ThreeY", list3y);
					if (urls.equals("http://" + SERVER_IP + ":65002/ganglion/register"))
						pixelObject.put("token_java", token);
					System.out.println(pixelObject.toJSONString());
					post(urls, pixelObject.toJSONString());
					// list2x.clear();
					list2y.clear();
					// list2x.clear();
					list3y.clear();
					pixelObject.clear();
					servercount++;
				}

			} catch (InterruptedException | AWTException e) {
				e.printStackTrace();
			}
	}

	public static void post(String strUrl, String jsonMessage) {
		try {
			URL url = new URL(strUrl);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();

			con.setRequestMethod("POST");

			// json으로 message를 전달하고자 할 때
			con.setRequestProperty("Content-Type", "application/json");
			con.setDoInput(true);
			con.setDoOutput(true); // POST 데이터를 OutputStream으로 넘겨 주겠다는 설정
			con.setUseCaches(false);
			con.setDefaultUseCaches(false);

			OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
			wr.write(jsonMessage); // json 형식의 message 전달
			wr.flush();

			StringBuilder sb = new StringBuilder();
			// 받아온 데이터 출력
			if (con.getResponseCode() == HttpURLConnection.HTTP_OK) {
				// Stream을 처리해줘야 하는 귀찮음이 있음.
				BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line + "\n");
				}
				br.close();
//                System.out.println("" + sb.toString());
				if (urls.equals("http://" + SERVER_IP + ":65002/ganglion/index")) {
					ja.setText(ja.getText() + "\n 토큰을 입력해주세요. : " + sb.toString() + "\n회원가입 요청중");
					token = sb.toString();
					jl.setText(token);
					urls = "http://" + SERVER_IP + ":65002/ganglion/register";
				} else if (sb.toString().equals("1\n")) {
					if (firstRegister == false) {
						ja.setText(ja.getText() + ".");
						firstRegister = true;
					} else
						ja.setText(ja.getText() + ".");
				} else if (sb.toString().equals("2\n")) {
					userStatus = "service";
					ja.setText(ja.getText() + ".");
				} else if (sb.toString().equals("4\n")) {
					ja.setText(ja.getText() + "\n 회원가입 완료!\n로그인 요청으로 전환합니다.\n로그인 시도중..");
					token = "";
//                    jb.setText("회원가입");
					jb.setIcon(new ImageIcon("resources/btnReg.png"));
					judgeRegister = false;
					urls = "http://" + SERVER_IP + ":65002/ganglion/login";
				} else if (sb.toString().equals("5\n")) {
					ja.setText(ja.getText() + ".");
					urls = "http://" + SERVER_IP + ":65002/ganglion/login";
				} else if (sb.toString().equals("6\n")) {
					ja.setText(ja.getText() + "\n 수면 분석 종료.\n");
					System.exit(0);
				} else if (urls.equals("http://" + SERVER_IP + ":65002/ganglion/analysis/index")) {
					ja.setText(ja.getText() + ".");
				} else {
					if (!sb.toString().equals("데이터 재 전송 요청..\n")) {
						JSONParser parser = new JSONParser();
						Object obj = parser.parse(sb.toString());
						JSONObject jsonObj = (JSONObject) obj;
						userNum = Integer.parseInt(jsonObj.get("userNum").toString());
						System.out.println(userNum);
						if (setLogin == true) {
							if (userNumTest == userNum) {
								ja.setText(ja.getText() + "\n 로그인 성공!\n " + jsonObj.get("userName").toString()
										+ "\n수면데이터 전송중..");
								urls = "http://" + SERVER_IP + ":65002/ganglion/analysis/index";
								setLogin = false;
							}
						} else {
							ja.setText(ja.getText() + "\n 로그인 성공!\n" + jsonObj.get("userName").toString()
									+ "\n수면데이터 전송중..");
							urls = "http://" + SERVER_IP + ":65002/ganglion/analysis/index";
						}
					} else {
						ja.setText(ja.getText() + ".");
					}
				}
				if (sb.toString().equals("충분한 데이터 누적\n")) {
					wr.close();
					br.close();
					con.disconnect();
					status = 1;
				}
				ja.setCaretPosition(ja.getDocument().getLength());

			} else {
				System.out.println(con.getResponseMessage());
			}

		} catch (Exception e) {
			System.err.println(e.toString());
		}
	}

	public static BufferedImage cropImage(BufferedImage src, int x, int y, int w, int h) { // 원본 , 시작x, 시작y, width,
		// height
		BufferedImage dest = src.getSubimage(x, y, w, h);
		return dest;
	}

}