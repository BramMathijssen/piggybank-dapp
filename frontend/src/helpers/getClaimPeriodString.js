export const getClaimPeriodString = (period) => {
    switch (period) {
      case 0:
        return 'Daily';
      case 1:
        return 'Weekly';
      case 2:
        return 'Monthly';
      default:
        return 'Unknown';
    }
  };