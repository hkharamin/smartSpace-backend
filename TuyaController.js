const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyain.com',
  accessKey: '8sxw9xm5mma9vnkagrvv',
  secretKey: '772fd7f5e7914d408f705150b6788c50',
});

const TuyaController = {
  getDeviceStatus: async (infrared_id, remote_id) => {
    try {
      const response = await tuya.request({
        path: `/v1.0/infrareds/${infrared_id}/remotes/${remote_id}/ac/status`,
        method: 'GET'
      });

      if (!response.success) {
        throw new Error('Failed to fetch device status');
      }

      return response.result;
    } catch (error) {
      throw new Error('Failed to fetch device data from Tuya API');
    }
  },

  setDeviceProperty: async (infrared_id, remote_id, property, newValue) => {
    try {
      const response = await tuya.request({
        path: `/v1.0/infrareds/${infrared_id}/air-conditioners/${remote_id}/command`,
        method: 'POST',
        body: {
          code: property,
          value: newValue
        }
      });

      if (!response.success) {
        throw new Error('Failed to set device property');
      }

      return response;
    } catch (error) {
      throw new Error(`Failed to set property ${property}: ${error}`);
    }
  }
};

module.exports = TuyaController;
