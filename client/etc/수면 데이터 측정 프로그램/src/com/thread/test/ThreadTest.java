package com.thread.test;

public class ThreadTest {

	public static void main(String[] args) {
		boolean flag = true;

		ThreadFirst ct = new ThreadFirst();
		Thread t = new Thread(ct, "d");

		while (flag) {
			flag = false;
			t.start();

		}
		System.out.println("메인끝");
		
		// 메인이 끝나도 쓰레드가 끝날때 종료된다
	}
}
