from typing import Any
from rest_framework.renderers import JSONRenderer
from rest_framework.utils.serializer_helpers import ReturnDict, ReturnList


class DataWrapperJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data: Any, accepted_media_type=None, renderer_context=None) -> bytes:
        response = renderer_context.get('response') if renderer_context else None

        # Оставляем формат ошибок DRF без обертки
        if response is not None and response.exception:
            return super().render(data, accepted_media_type, renderer_context)

        # Пагинация DRF
        if isinstance(data, dict) and {'results', 'count'}.issubset(data.keys()):
            wrapped = {
                'data': data.get('results'),
                'pagination': {
                    'count': data.get('count'),
                    'next': data.get('next'),
                    'previous': data.get('previous'),
                },
            }
            return super().render(wrapped, accepted_media_type, renderer_context)

        # Обычные ответы: список/объект/примитивы
        if isinstance(data, (ReturnList, list)) or isinstance(data, (ReturnDict, dict)) or data is None:
            wrapped = {'data': data}
        else:
            wrapped = {'data': data}

        return super().render(wrapped, accepted_media_type, renderer_context)


