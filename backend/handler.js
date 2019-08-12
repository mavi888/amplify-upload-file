'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: 'Hello World',
    headers: {
			'Access-Control-Allow-Origin': '*'
		},
  };
};