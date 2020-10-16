const express = require('express');
const router = express.Router();
const gpio = require('node-wiring-pi');

const LED1 = 27;
const LED2 = 28;
const LED3 = 29;

exports.g1 = (y, mp, mn, ips, ins, count) => {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
	var a = "";
	for(let i = 0; i < y.length; i++) {
		if(max > y[i]) {
			max = y[i];
			mp[count] = max;
			maxX = i;
		}
	}

	for(let i = 0; i < y.length; i++) {
		if(min < y[i]) {
			min = y[i];
			mn[count] = min;
			minX = i;
		}
	}

	let ip = maxX;
	ips[count] = ip;
	let in1 = 0;

	let check = 0;
	for(let i = 0; i < y.length; i++) {
		if(i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;

			console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if(check == 1)
			break;
	}

	in1 = minX - in1;
	ins[count] = in1;
	console.log(maxX + "   " + minX);
	console.log("Mp : " + max + "    Mn : " + min + "    Ip : " + ip + "    In : " + in1);
};

exports.g1forCheck = (y, mp, mn, ips, ins) => {
	let max = 100; let maxX = 0;
	let min = 100; let minX = 0;
	var a = "";
	for(let i = 0; i < y.length; i++) {
		if(max > y[i]) {
			max = y[i];
			maxX = i;
		}
	}

	for(let i = 0; i < y.length; i++) {
		if(min < y[i]) {
			min = y[i];
			minX = i;
		}
	}

	let ip = maxX;
	let in1 = 0;

	let check = 0;
	for(let i = 0; i < y.length; i++) {
		if(i > maxX + 2 && y[i] >= 100) {
			in1 = minX - i;
			console.log("aa");
			//in1 = j;
			check = 1;
			break;
		}
		if(check == 1)
			break;
	}

	in1 = minX - in1;
	var max_mp = 0;
	var min_mp = 1000;
	var max_mn = 0;
	var min_mn = 1000;
	var max_ips = 0;
	var min_ips = 1000;
	var max_ins = 0;
	var min_ins = 1000;

	mp.forEach((data, index) => {
		if(max_mp < mp[index])
			max_mp = mp[index];
		if(min_mp > mp[index])
			min_mp = mp[index];
		if(max_mn < mn[index])
			max_mn = mn[index];
		if(min_mn > mn[index])
			min_mn = mn[index];
		if(max_ips < ips[index])
			max_ips = ips[index];
		if(min_ips > ips[index])
			min_ips = ips[index];
		if(max_ins < ins[index])
			max_ins = ins[index];
		if(min_ins > ins[index])
			min_ins = ins[index];
	});
	console.log("최대 최소 : " + max_mp + ", " + min_mp + ", " + max_mn + ", " + min_mn + ", " + max_ips + ", " + min_ips + ", " + max_ins + ", " + min_ins);
	console.log("Mp : " + max + "    Mn : " + min + "    Ip : " + ip + "    In : " + in1);
	if(max >= min_mp -2 && max <= max_mp + 2 && min >= min_mn -2 && min <= max_mn +2 && ip >= min_ips -2 && ip <= max_ips +2 && in1 >= min_ins -2 && in1 <= max_ins +2){
		console.log("인증성공!");
		gpio.digitalWrite(LED2, 1);
		gpio.digitalWrite(LED3, 1);
		gpio.digitalWrite(LED1, 1);
		setTimeout(TurnOff, 1000);
		return true;
	}
	else {
		console.log("인증실패");
		return false;
	}

};

const TurnOff = () => {
	gpio.digitalWrite(LED2, 0);
	gpio.digitalWrite(LED3, 0);
	gpio.digitalWrite(LED1, 0);
}
