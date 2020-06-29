
function sum(a,b){
    return a+b;
}

test('prueba en test ', () => {
    expect(sum(1, 2)).toBe(3);
})