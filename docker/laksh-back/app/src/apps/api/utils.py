import ujson


def decode_request_body(body: bin) -> dict:
    return ujson.loads(body)