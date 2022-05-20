const swaggerDoc = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Refugee App',
        description: 'Refugee App API',
    },

    host: 'localhost:3001',
    basePath: '/',

    consumes: ['application/json'],
    produces: ['application/json'],

    apis: ['./routes/*.js'],

    paths: {
        '/users/new': {
            post: {
                tags: ['Users'],
                summary: 'Add new user in system',
                parameters: [
                    {
                        name: 'User',
                        description: 'Generic user. Not all parameters are needed for all user types',
                        in: 'body',
                        schema: {
                            $ref: '#/definitions/User',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#definitions/User',
                        },
                    },
                },
            },
        },

        '/generic/countries': {
            get: {
                tags: ['Countries'],
                summary: 'Get all countries in app',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Country',
                        },
                    },
                },
            },
        },
        '/generic/languages': {
            get: {
                tags: ['Languages'],
                summary: 'Get all languages in app',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Language',
                        },
                    },
                },
            },
        },

        '/locations': {
            get: {
                tags: ['Locations'],
                summary: 'Get all locations in app',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Locations',
                        },
                    },
                },
            },
        },

        '/locations/{location_id}': {
            get: {
                tags: ['Locations'],
                summary: 'Get specific location',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Location',
                        },
                    },
                },
            },
        },

        '/locations/new': {
            post: {
                tags: ['Locations'],
                summary: 'Add new location',
                parameters: [
                    {
                        name: ' Name',
                        description: "Location's name",
                    },
                    {
                        name: 'Address',
                        description: "Location's address'",
                    },
                ],
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'Location is added',
                        schema: {
                            $ref: '#/definitions/Location',
                        },
                    },
                },
            },
        },

        '/locations/leave': {
            delete: {
                summary: 'Delete location from refugee entry',
                tags: ['Locations'],
                responses: {
                    200: {
                        description: 'Location is deleted from refugee entry',
                        schema: {
                            $ref: '#/definitions/Location',
                        },
                    },
                },
            },
        },

        '/services': {
            get: {
                tags: ['Services'],
                summary: 'Get all services',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Services',
                        },
                    },
                },
            },
        },

        '/services/{service_id}': {
            get: {
                tags: ['Services'],
                summary: 'Get specific service',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Service',
                        },
                    },
                },
            },
        },

        '/services/new': {
            post: {
                tags: ['Services'],
                summary: 'Add new service to particular location',
                parameters: [
                    {
                        name: 'Type',
                        description: 'Service type',
                        in: 'body',
                    },
                    {
                        name: 'Location',
                        description: 'Location',
                        in: 'body',
                    },
                ],
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'Service is added',
                        schema: {
                            $ref: '#/definitions/Service',
                        },
                    },
                },
            },
        },

        '/accomodation-request/{request_id}': {
            get: {
                tags: ['AccomodationRequests'],
                summary: 'Get specific accomodation request from refugee',
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/AccomodationRequest',
                        },
                    },
                },
            },
        },

        '/accomodation-request/new': {
            post: {
                tags: ['AccomodationRequests'],
                summary: 'Add accomodation request for particular location',
                parameters: [
                    {
                        name: 'Location',
                        description: 'Location',
                        in: 'body',
                        schema: {
                            $ref: '#/definitions/AccomodationRequest',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'Accomodation request has been sent',
                        schema: {
                            $ref: '#/definitions/AccomodationRequest',
                        },
                    },
                },
            },
        },

        '/accomodation-request/{request_id}': {
            put: {
                tags: ['AccomodationRequests'],
                summary: 'Owner responds to accomodation request',
                parameters: [
                    {
                        name: 'Request',
                        in: 'body',
                        description: 'Accomodation request',
                    },
                ],
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'Response has been sent',
                        schema: {
                            $ref: '#/definitions/AccomodationRequest',
                        },
                    },
                },
            },
        },
    },

    definitions: {
        User: {
            required: ['name', 'role', 'phone', 'email'],
            properties: {
                role: {
                    type: 'string',
                    enum: ['owner', 'provider', 'refugee'],
                },
                name: {
                    type: 'string',
                },
                phone: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                id_country: {
                    type: 'integer',
                    uniqueItems: true,
                    description: 'Country id required for a refugee',
                },
                id_language: {
                    type: 'integer',
                    uniqueItems: true,
                    description: 'Language id required for a refugee',
                },
                no_adults: {
                    type: 'integer',
                    description: 'No of adults required for a refugee',
                },
                no_children: {
                    type: 'integer',
                    description: 'No of children required for a refugee',
                },
                notes: {
                    type: 'string',
                    description: 'Notes required for a refugee',
                },
            },
        },

        Country: {
            required: ['_id', 'name'],
            properties: {
                _id: {
                    type: 'integer',
                    uniqueItems: true,
                },
                name: {
                    type: 'string',
                },
            },
        },

        Language: {
            required: ['_id', 'name'],
            properties: {
                _id: {
                    type: 'integer',
                    uniqueItems: true,
                },
                name: {
                    type: 'string',
                },
            },
        },

        Location: {
            required: ['name', '_id', 'address'],
            properties: {
                _id: {
                    type: 'integer',
                    uniqueItems: true,
                },
                name: {
                    type: 'string',
                },
                address: {
                    type: 'string',
                },
            },
        },

        Service: {
            required: ['_id', 'location', 'type', 'description'],
            properties: {
                _id: {
                    type: 'integer',
                    uniqueItems: true,
                },
                type: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
                location: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        address: {
                            type: 'string',
                        },
                    },
                },
            },
        },

        Locations: {
            type: 'array',
            items: {
                $ref: '#/definitions/Location',
            },
        },

        Services: {
            type: 'array',
            items: {
                $ref: '#/definitions/Service',
            },
        },

        AccomodationRequest: {
            required: ['_id', 'location', 'type'],
            properties: {
                _id: {
                    type: 'integer',
                    uniqueItems: true,
                },
                location: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        address: {
                            type: 'string',
                        },
                    },
                },
            },
        },

        AccomodationRequests: {
            type: 'array',
            items: {
                $ref: '#/definitions/AccomodationRequest',
            },
        },
    },
};

export default swaggerDoc;
