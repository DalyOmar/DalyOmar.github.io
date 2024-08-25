@app.route('/sumar', methods=['POST'])
def sumar():
    data = request.json
    print(data)  # Esto mostrará los datos en la terminal para verificar
    num1 = data.get('num1')
    num2 = data.get('num2')
    resultado = num1 + num2
    return jsonify({'resultado': resultado})
