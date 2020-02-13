"""
Tests for the REST API views.
"""
from rest_framework.test import APITestCase

from trades.models import DerivativeTrade


class ListCreateDerivativeTradeTest(APITestCase):
  
    def test_list_derivative_trades(self):
        """Test that all trades from the database are listed."""
        # Create some trades.
        for i in range(1, 6):
            DerivativeTrade.objects.create(
                date_of_trade='2020-02-13',
                trade_id=str(i),
                product='1',
                buying_party='a', 
                selling_party='b',
                notational_amount='1',
                quantity='1',
                notational_currency='c',
                maturity_date='2020-02-20',
                underlying_price='1',
                underlying_currency='d',
                strike_price='1'
            )
        # Make the request.
        response = self.client.get('/trades/')
        # Test the response status code is correct
        self.assertEqual(200, response.status_code)
        # Test there are 5 DerivativeTrade in the response
        self.assertEqual(5, len(response.data))

    def test_create_derivative_trades(self):
        """Test the creation of a trade."""
        trade_data = {
            'date_of_trade': '2020-02-02',
            'trade_id': '1',
            'product': '1',
            'buying_party': '1',
            'selling_party': '1',
            'notational_amount': 1.0,
            'quantity': 1.0,
            'notational_currency': '1',
            'maturity_date': '2020-02-20',
            'underlying_price': 1.0,
            'underlying_currency': '1',
            'strike_price': 1.0
        }
        # Post correct data 
        response = self.client.post('/trades/', data=trade_data)
        self.assertEqual(201, response.status_code)