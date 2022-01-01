from datetime import datetime


def convert_datetime_to_datetime(data):
    convert_data = datetime.strftime(data, "%Y-%m-%d %H:%M:%S")
    return convert_data


def convert_datetime_timezone_to_datetime(data):
    if data is not None:
        try:
            convert_data = datetime.strptime(data, '%Y-%m-%dT%H:%M:%S.%fZ')
        except:
            convert_data = datetime.strptime(data, '%Y-%m-%dT%H:%M:%S%z')
        data = convert_data.strftime('%Y-%m-%d %H:%M:%S')
    else:
        data = None
    return data
