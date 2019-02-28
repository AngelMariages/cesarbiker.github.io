#include <math.h>

#define NUM_DECIMALS 6

double setPrecision(double num);
double pow(double num, double exp);

double precision = 0.0;

double multiply(double a, double b) {
	return setPrecision((a * b));
}

double setPrecision(double num) {
	if (precision == 0.0) {
		precision = pow(10, NUM_DECIMALS);
	}

	return floor(num * precision) / precision;
}

double pow(double num, double exp) {
	double result = num;

	for (int i = 1; i < exp; i++) {
		result *= num;
	}

	return result;
}