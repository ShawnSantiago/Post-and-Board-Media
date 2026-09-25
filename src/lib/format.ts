const dateFmt = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const cadFmt = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });
const numFmt = new Intl.NumberFormat('en-CA');

export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));
export const formatCad = (n: number) => cadFmt.format(n);
export const formatNumber = (n: number) => numFmt.format(n);
