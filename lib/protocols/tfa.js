module.exports = function(helper) {
  var protocolInfo, pulsesToBinaryMapping;
  pulsesToBinaryMapping = {
    '01': '1',
    '02': '0',
    '03': ''
  };
  return protocolInfo = {
    name: 'tfa',
    type: 'weather',
    values: {
      id: {
        type: "number"
      },
      temperature: {
        type: "number"
      },
      humidity: {
        type: "number"
      }
    },
    models: ["tfa"],
    pulseLengths: [506, 625, 2013, 7728],
    pulseCount: 88,
    decodePulses: function(pulses) {
      var a, b, binary, c, result;
      binary = helper.map(pulses, pulsesToBinaryMapping);
      console.log(binary);
      a = helper.binaryToNumber(binary, 22, 25) * 256;
      b = helper.binaryToNumber(binary, 18, 21) * 16;
      c = helper.binaryToNumber(binary, 14, 17);
      return result = {
        id: helper.binaryToNumber(binary, 2, 9),
        temperature: Math.round(((((((a + b + c) * 10) - 9000) - 3200) * (5 / 9)) / 100) * 10) / 10,
        humidity: helper.binaryToNumber(binary, 26, 29) + helper.binaryToNumber(binary, 30, 33) * 16
      };
    }
  };
};