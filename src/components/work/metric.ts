/** Splits a metric string such as "+42%", "45 days", "1,000+" or "Zero" into parts the count-up can animate. */
export interface MetricParts {
  prefix: string;
  /** Digits as written, for example "1,000" or "4.9". Empty when the value is a word. */
  digits: string;
  /** Numeric target for the count-up, or null when there is nothing to count. */
  target: number | null;
  decimals: number;
  comma: boolean;
  suffix: string;
  /** True when the suffix is a word ("days") rather than a symbol ("%", "x", "+"). */
  unit: boolean;
  /** Approximate width in em, used to size the number so it always fits its column. */
  chars: number;
}

export function splitMetric(value: string): MetricParts {
  const match = value.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {
      prefix: value,
      digits: '',
      target: null,
      decimals: 0,
      comma: false,
      suffix: '',
      unit: false,
      chars: value.length * 0.85,
    };
  }
  const [, prefix, digits, suffix] = match;
  const target = parseFloat(digits.replace(/,/g, ''));
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  const unit = /^\s*[a-z]/i.test(suffix);
  return {
    prefix,
    digits,
    target,
    decimals,
    comma: digits.includes(','),
    suffix,
    unit,
    chars: emWidth(prefix.trim(), 0.65) + emWidth(digits, 1) + (unit ? 0.9 : emWidth(suffix.trim(), 1.25)),
  };
}

/** Approximate width in em of Syne 800 text, so the count-up numbers can be sized to fit their column. */
function emWidth(text: string, symbol: number): number {
  let w = 0;
  for (const ch of text) w += /\d/.test(ch) ? 1 : /[.,]/.test(ch) ? 0.4 : symbol;
  return w;
}

/** Case studies that are concept work, not shipped products. Their metrics are projections. */
export const CONCEPT_SLUGS = new Set(['toyota']);
