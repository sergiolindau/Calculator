var inputText: string = "# Solução da equação de 2º grau:  x^2-10*x+24=0\n\
\n\
# definição dos coeficientes\n\
a = 1\n\
b = -10\n\
c = 21\n\
\n\
# solução pela fórmula de Bhaskara\n\
Delta = b^2-4*a*c\n\
x1 = (-b + raizq(Delta))/(2*a)\n\
x2 = (-b - raizq(Delta))/(2*a)\n\
\n\
\n\
# definição da função de 2º grau\n\
f(x) = a*x^2+b*x+c\n\
\n\
# mostra gráfico das raízes de f(x)\n\
gráfico(f(x),x,min([x1,x2,0])-1,max([x1,x2,0])+1)";

var linesArray: Array<string> = inputText.split("\n");

/*

var inputText: string = "# Solução da equação de 2º grau:  x^2-10*x+24=0\n\
# definição dos coeficientes\n\
a = 1\n\
b = -10\n\
c = 21\n\
\n\
# solução pela fórmula de Bhaskara\n\
Delta = b^2-4*a*c\n\
x1 = (-b + raizq(Delta))/(2*a)\n\
x2 = (-b - raizq(Delta))/(2*a)\n\
\n\
\n\
# definição da função de 2º grau\n\
f(x) = a*x^2+b*x+c\n\
\n\
# mostra gráfico das raízes de f(x)\n\
gráfico(f(x),x,min([x1,x2,0])-1,max([x1,x2,0])+1)\n\
\n\
# Testando funções e operações básicas\n\
10^2\n\
(-10)^2\n\
2^2\n\
2^-1\n\
sqrt(2)\n\
2^(1/2)\n\
2^(1/3)\n\
(-2)^(1/2)\n\
(-1)^(1/2)\n\
logbl(2,-1)\n\
logbl(0,8)\n\
root(64,3)\n\
e^(i*pi)\n\
f(x)=sin(x).^2+cos(x).^2\n\
trig_cycle_20=[0,pi/6,pi/4,pi/3;pi/2,2*pi/3,3*pi/4,5*pi/6;pi,7*pi/6,5*pi/4,4*pi/3;3*pi/2,5*pi/3,7*pi/4,11*pi/6;2*pi,5*pi/2,3*pi,7*pi/2]\n\
A=trig_cycle_20\n\
sin(A).^2+cos(A).^2\n\
f(3.14)\n\
z=1\n\
f(z)\n\
f(A)\n\
\n\
# Testando operações de matrizes\n\
# Cria a matriz 3x3 com elementos nulos\n\
A = zeros(3)\n\
ones([3,7])\n\
zeros(4,9)\n\
# Cria a matriz identidade 3x3\n\
A = eye(3)\n\
# Traço da matriz\n\
traco(A)\n\
# Define matrizes para operar\n\
A = [1,2,0;1,1,0;-1,4,0]\n\
B = [1,2,3;1,1,-1;2,2,2]\n\
C = [1,2,3;1,1,-1;1,1,1]\n\
D = [1,3,-9,5;2,-3,-5,5;2,8,-1,7;3,-4,3,6]\n\
# Soma\n\
F = A+B\n\
# Produto\n\
G = 2*A\n\
H = A*B\n\
S = A*C\n\
# Apesar de B diferente de C o produto A*B e A*C resulta igual\n\
# Divisão\n\
P = A/B\n\
# Negativo\n\
-P\n\
# mapear função\n\
sin(P)\n\
# Matriz transposta\n\
K = transp(P)\n\
# Determinante\n\
det(D) # (-97)\n\
# Matriz inversa\n\
inv(D)\n\
# Potência\n\
D^-1\n\
D^3\n\
D^0\n\
A=[2,1,-3;-1,3,2;3,1,-3]\n\
det(A) # (11)\n\
inv(A)\n\
1/det(A)*adj(A) # é igual a inv(A)\n\
ludec(A)\n\
minor(A,1,1)\n\
M=[5,6,4,7,4,5;3,2,4,1,5,5]\n\
mean(M)\n\
min([9,8,7,6,5,4,3,2,1])\n\
M=[1,2,3,4,5;'sapo','cão','gato','pato','macaco']\n\
hist(M)\n\
\n\
# Testando função gauss\n\
A=[2,1,-3;-1,3,2;3,1,-3]\n\
X=[-1,12,0]\n\
gauss(A,X)\n\
X=[-1;12;0]\n\
gauss(A,X)\n\
Z=X.'\n\
gauss(A,X)\n\
A=[1,1;2,1]\n\
X=[10,16]\n\
gauss(A,X)\n\
A=[1,1,1;2,1,2;1,2,3]\n\
X=[6,10,14]\n\
gauss(A,X)\n\
# Testando substituição de letras gregas\n\
alpha=1\n\
nalphax=1\n\
alphax=1\n\
q_alpha_3=1\n\
alfa=1\n\
# Testando decomposição LU\n\
A = [1,2,3;4,5,6;7,8,9]\n\
det(A)\n\
B=pivot(A)*A\n\
det(B)\n\
ludec(B)\n\
# Testando concatenação de matrizes\n\
A=[1,2,3;4,5,6]\n\
B=[7,8,9;10,11,12]\n\
C=[A,B]\n\
D=[A;B]\n\
F=[A;7:9]\n\
G=[20;30;40]\n\
H=[F,G]\n\
K=[A,B;A,B]\n\
L=[K;A,B]\n\
M=L.'\n\
N=L'\n\
O=[1:5]\n\
P=O.'\n\
Q=O'\n\
R=P.'\n\
S=P'\n\
O=[1:4;A] # erro\n\
[1,2;3,4;6,6,7] # erro\n\
a=3\n\
A=[1,2,3;4,5,6;7,8,9]\n\
B=[3,4,5;6,7,8;9,10,11]\n\
C=[3,4,5]\n\
D=[3;4;5]\n\
F=[1,2,3,4]\n\
G=[1;2;3;4]\n\
A+a\n\
a+A\n\
A.+B\n\
A+C\n\
A+D\n\
A+F # erro\n\
A+G # erro\n\
A-a\n\
a-A\n\
A-B\n\
A-C\n\
A-D\n\
A-F # erro\n\
A-G # erro\n\
A*B\n\
3*A\n\
A*3\n\
A=[1,2,4;4,5,6]\n\
B=[1,2;3,4;5,6]\n\
A*B\n\
A.*B # erro\n\
A*[1,2,3] # erro\n\
A.*[1,2,3]\n\
A=[1:3;4:6;7:9]\n\
det(A)\n\
inv(A) # retorna matriz Inf\n\
A=[1:3;4:6]\n\
det(A) #erro\n\
inv(A) #erro\n\
size(A)\n\
[1:3;4,5,6,7;7,8,9] # erro\n\
A=[1:3;4,5,6,7;7,8,9] # erro\n\
A=[1,2,3;4,5;7,8,9,10] # erro\n\
A()=2\n\
A\n\
A()\n\
A(1) # erro\n\
A=[pi/6,pi/2,3*pi/2]\n\
size(A)\n\
size(A')\n\
A=[pi/6,pi/2,3*pi/2;3*pi,pi,6;7,8,9]\n\
size(A)\n\
eye(3)\n\
eye(3,2)\n\
B=sin(A)\n\
A = [1,2,3;4,5,6;7,8,9]\n\
C = A.^-1\n\
a = [2,3]\n\
b = (1:3)'\n\
a = [2,3]\n\
b = (1:3)'\n\
a.+b\n\
b.+a\n\
a.^b\n\
A = -1\n\
B = 1/3\n\
C = A.^B\n\
A(1,1,3) # erro\n\
A(1) # erro\n\
A(1,1) # erro\n\
A(1,1)=100 # erro\n\
# Test array indexing\n\
magic_7=[30,39,48,1,10,19,28;38,47,7,9,18,27,29;46,6,8,17,26,35,37;5,14,16,25,34,36,45;13,15,24,33,42,44,4;21,23,32,41,43,3,12;22,31,40,49,2,11,20] # magic(7)\n\
A=magic_7\n\
A(1) # 30\n\
A(3) # 46\n\
A(7) # 22\n\
A(8) # 39\n\
A(15) # 48\n\
A(7*7) # 20\n\
A\n\
A([1,2,3;4,5,6])\n\
A\n\
A([1,2;3,4],[1,2,3])\n\
A\n\
A(1,1)\n\
A(1,2)\n\
A(2,1)\n\
A(50) # erro\n\
A(9,3) # erro\n\
A(3,10) # erro\n\
A([1,2,3;4,5,9],[1,2,6]) # erro\n\
A([1,2,3;4,5,6],[1,2,10]) # erro\n\
# Testando dimensões\n\
B=[A,A(1:7,1)]\n\
size(B)\n\
size(B,1)\n\
size(B,2)\n\
size(B,1,1) % erro\n\
size(B,[1,2]) % erro\n\
size(1)\n\
C=[]\n\
size(C)\n\
A*C # erro\n\
C*A # erro\n\
1*C\n\
C*1\n\
sub2ind ([3,3],[2,2,1,1],[1,3,3,2]) # [2,8,7,4]\n\
sub2ind ([3,3],[2,2;1,1],[1,3;3,2]) # [2,8;7,4]\n\
B=[1,2,3;1:3;4,5,6]\n\
B=A^2\n\
C=[A,A(1:7,1)]\n\
D=[]\n\
E=1:7\n\
F=[1:7;2:8]\n\
G=[1:7]'\n\
H=[1:7;2:8]'\n\
A+B\n\
A+C # erro\n\
A+D # erro\n\
A+E\n\
A+F # erro\n\
A+G\n\
A+H # erro\n\
1*D\n\
D*1\n\
2*C\n\
C*2\n\
D*D\n\
A*D # erro\n\
gamma(5)\n\
gamma(6)\n\
gamma(7)\n\
gamma(4+i)\n\
3>2\n\
(3>2)+1\n\
A=[1,2,3;4,5,6;7,8,9]\n\
B=A>5\n\
B=A>=5\n\
B+1\n\
(A>5)+1\n\
1+(A>5)\n\
e^(i*pi)==-1\n\
i^i==e^-(pi/2)\n\
(2+i)==(1+2i)\n\
root(64,3)==4\n\
root(2^(3*16),3)==2^16\n\
root(2^(3*1.02399999999999999991e3),3)==2^1.02399999999999999991e3\n\
root((1e-323),323)==0.1\n\
root(64,3)!=4\n\
root(2^(3*16),3)!=2^16\n\
root(2^(3*1.02399999999999999991e3),3)!=2^1.02399999999999999991e3\n\
root((1e-323),323)!=0.1\n\
e^(i*pi)==-1\n\
arg(0)\n\
arg(-0)\n\
arg(0i)\n\
arg(-0i)\n\
arg(0-0i)\n\
arg(0+0i)\n\
arg(-0+0i)\n\
arg(-0-0i)\n\
arg(1-i)\n\
arg(-1-i)\n\
arg(-1+i)\n\
arg(1+i)\n\
A=2+i\n\
B=1+2i\n\
A>B\n\
B>A\n\
A>=B\n\
B>=A\n\
A==B\n\
A!=B\n\
gt(B,A)\n\
# Testando singularidades\n\
A=Inf\n\
A=inf\n\
B=-Inf\n\
B=-inf\n\
C=1/0 # Inf\n\
D=i/0 # NaN + Infi\n\
E=(1+i)/0 # Inf + Infi\n\
F=(-1+i)/0 # -Inf + Infi\n\
G=(1-i)/0 # Inf - Infi\n\
H=(-1-i)/0 # -Inf - Infi\n\
\n\
0/0 # NaN\n\
Inf/0 # Inf\n\
0/Inf # 0\n\
3/0 # Inf\n\
-3/0 # -Inf\n\
3i/0 # NaN + Infi\n\
-3i/0 # NaN - Infi\n\
(3+3i)/0 # Inf + Infi\n\
(-3+3i)/0 # -Inf + Infi\n\
(3-3i)/0 # Inf - Infi\n\
(-3-3i)/0 # -Inf - Infi\n\
1/Inf # 0\n\
1/-Inf # 0\n\
0/Inf # 0\n\
0/-Inf # 0\n\
2/((3+3i)/0) # 0\n\
3/(3i/0) # 0\n\
Inf/Inf # NaN\n\
Inf/-Inf # NaN\n\
-Inf/Inf # NaN\n\
-Inf/-Inf # NaN\n\
1*Inf # Inf\n\
Inf*1 # Inf\n\
-1*Inf # -Inf\n\
Inf*-1 # -Inf\n\
-Inf*1 # -Inf\n\
-Inf*-1 # Inf\n\
Inf*Inf # Inf\n\
Inf*-Inf # -Inf\n\
0*Inf # NaN\n\
NaN\n\
NaN+NaN*i\n\
-NaN\n\
Inf^2 # Inf\n\
Inf^-2 # 0\n\
Inf^(1/2) # Inf\n\
Inf^0 # 1\n\
Inf^1 # Inf\n\
Inf^-1 # 0\n\
Inf^Inf # Inf\n\
Inf^-Inf # 0\n\
Inf^i # NaN - NaNi\n\
i^Inf # NaN - NaNi\n\
######################### Ainda falta implementação\n\
1^Inf # 1\n\
1^(-Inf) # 1\n\
1^(Inf*i) # NaN - NaNi\n\
1^(-Inf*i) # NaN - NaNi\n\
(-1)^Inf # NaN - NaNi\n\
(-1)^(-Inf) # NaN - NaNi\n\
(-1)^(Inf*i) # 0\n\
(-1)^(-Inf*i) # Inf - NaNi\n\
i^(Inf) # NaN - NaNi\n\
i^(-Inf) # NaN - NaNi\n\
i^(Inf*i) # 0\n\
i^(-Inf*i) # Inf - NaNi\n\
(-i)^Inf # NaN - NaNi\n\
(-i)^(-Inf) # NaN - NaNi\n\
(-i)^(Inf*i) # Inf - NaNi\n\
(-i)^(-Inf*i) # 0\n\
factorial(5)\n\
factorial(13)\n\
factorial(21)\n\
factorial(22)\n\
factorial(5.4) # erro\n\
factorial(999999999999999)\n\
zeros(3)\n\
zeros(3,7)\n\
zeros([3,7])\n\
";

var linesArray: Array<string> = inputText.split("\n");//*/

/*

var inputText: string = "\n\
a=1;b=2\n\
A=[1,2,3;4,5,6;]";

var linesArray: Array<string> = inputText.split("\n");//*/
