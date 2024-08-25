from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/sumar', methods=['POST'])
def sumar():
    data = request.get_json()
    num1 = data.get('num1', 0)
    num2 = data.get('num2', 0)
    resultado = num1 + num2
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
