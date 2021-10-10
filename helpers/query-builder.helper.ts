import mongoose from 'mongoose';

class QueryBuilderHelper {
  public valueMatcher(filter: any, key: string, value: any) {
    if (value || value === false) {
      filter[key] = value;
    }
    return filter;
  }

  public objectIdMatcher(filter: any, key: string, value: any) {
    if (value) {
      filter[key] = new mongoose.Types.ObjectId(value);
    }
    return filter;
  }

  public patternMatcher(filter: any, key: string, value: any) {
    if (value) {
      filter[key] = { $regex: new RegExp(value, 'i') };
    }
    return filter;
  }

  public patternUnMatcher(filter: any, key: string, value: any) {
    if (value) {
      filter[key] = { $not: new RegExp(value, 'i') };
    }
    return filter;
  }

  public orOperator(filter: any, valuesArray: any[]) {
    if (valuesArray && valuesArray.length > 0) {
      filter['$or'] = valuesArray;
    }
    return filter;
  }

  public andOperator(filter: any, valuesArray: any[]) {
    if (valuesArray && valuesArray.length > 0) {
      filter['$and'] = valuesArray;
    }
    return filter;
  }

  public arrayElementMatcher(filter: any, key: string, valuesArray: any[]) {
    if (valuesArray && valuesArray.length > 0) {
      filter[key] = { $in: valuesArray };
    }
    return filter;
  }

  public phoneNumberPatternMatcher(filter: any, value: number) {
    if (value) {
      if (!filter.$expr) {
        filter.$expr = {};
      }
      if (!filter.$expr.$and) {
        filter.$expr.$and = [];
      }
      filter.$expr.$and.push({
        $regexMatch: {
          input: { $toString: '$phone_number' },
          regex: new RegExp(value.toString(), 'i')
        }
      });
    }
    return filter;
  }
}

export default new QueryBuilderHelper();
