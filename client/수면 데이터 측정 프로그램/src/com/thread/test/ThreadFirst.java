package com.thread.test;

public class ThreadFirst implements Runnable {


	public ThreadFirst() {
	}


	@Override
	public void run() {
		for(int i =0;i<10;i++) {
			System.out.println("thread : "+i);
		}
		System.out.println("쓰레드끝");
	}
}