"""
Tests for the REST API views.
"""
import datetime

from rest_framework.test import APITestCase

from trades.models import DerivativeTrade


class ListCreateDerivativeTradeTest(APITestCase):
    def test_list_derivative_trades(self):
        """Test that all trades from the database are listed."""
        # Create 5 trades.
        for i in range(1, 6):
            DerivativeTrade.objects.create(
                date_of_trade='2020-02-13 10:10',
                trade_id=str(i),
                product='1',
                buying_party='a', 
                selling_party='b',
                notional_amount='1',
                quantity='1',
                notional_currency='c',
                maturity_date='2020-02-20',
                underlying_price='1',
                underlying_currency='d',
                strike_price='1'
            )
        # Make the request.
        response = self.client.get('/trades/')
        # Test the response status code is correct
        self.assertEqual(200, response.status_code)
        # Test there are 4 DerivativeTrade in the response
        self.assertEqual(4, len(response.data))

    def test_create_derivative_trades(self):
        """Test the creation of a trade."""
        trade_data = {
            'date_of_trade': '2020-02-02 10:10',
            'trade_id': '1',
            'product': '1',
            'buying_party': '1',
            'selling_party': '1',
            'notional_amount': 1.0,
            'quantity': 1.0,
            'notional_currency': '1',
            'maturity_date': '2020-02-20',
            'underlying_price': 1.0,
            'underlying_currency': '1',
            'strike_price': 1.0
        }
        # POST data 
        response = self.client.post('/trades/', data=trade_data)
        self.assertEqual(201, response.status_code)

class RetrieveUpdateDestroyDerivativeTradeTest(APITestCase):
    def setUp(self):
        self.today = datetime.datetime.now()
        DerivativeTrade.objects.create(
            date_of_trade=self.today,
            trade_id=1,
            product='a',
            buying_party='b',
            selling_party='c',
            notional_amount=1,
            quantity=1,
            notional_currency='GDP',
            maturity_date='2020-02-20',
            underlying_price=1,
            underlying_currency='USD',
            strike_price=1
        )

    def test_patch_derivative_trade(self):
        """Test the partial updating of a derivative trade using PUT."""
        updated_data = {
            'strike_price': 5.0
        }       
        # PATCH updated data 
        response = self.client.patch('/trades/1/', data=updated_data)
        self.assertEqual(200, response.status_code)

    def test_put_derivative_trade(self):
        """Test the updating of a derivative trade using UPDATE."""
        updated_data = {
            'date_of_trade': self.today,
            'trade_id': '1',
            'product': '3',
            'buying_party': '1',
            'selling_party': '1',
            'notional_amount': 6.0,
            'quantity': 1.0,
            'notional_currency': '1',
            'maturity_date': '2020-02-20',
            'underlying_price': 1.0,
            'underlying_currency': '1',
            'strike_price': 5.0
        }       
        # PUT updated data 
        response = self.client.put('/trades/1/', data=updated_data)
        self.assertEqual(200, response.status_code)

    def test_delete_derivative_trade(self):
        """Test the deleting of a derivative trade."""
        response = self.client.delete('/trades/1/')
        self.assertEqual(204, response.status_code)

    def test_editable_trade_pass(self):
        """Test thats a Trade under and equal to 7 days old is editable."""
        DerivativeTrade.objects.create(
            date_of_trade=self.today,
            trade_id=7,
            product='a',
            buying_party='b',
            selling_party='c',
            notional_amount=1,
            quantity=1,
            notional_currency='GDP',
            maturity_date='2020-02-20',
            underlying_price=1,
            underlying_currency='USD',
            strike_price=1
        )
        updated_data = {
            'date_of_trade': self.today,
            'trade_id': 7,
            'product': '3',
            'buying_party': '1',
            'selling_party': '1',
            'notional_amount': 6.0,
            'quantity': 1.0,
            'notional_currency': '1',
            'maturity_date': '2020-02-20',
            'underlying_price': 1.0,
            'underlying_currency': '1',
            'strike_price': 5.0
        }       
        response = self.client.put('/trades/7/', data=updated_data)
        self.assertEqual(200, response.status_code)

    def test_editable_trade_fail(self):
        """Test thats a Trade over 7 days old is not editable."""
        DerivativeTrade.objects.create(
            date_of_trade=self.today - datetime.timedelta(days=10),
            trade_id=8,
            product='a',
            buying_party='b',
            selling_party='c',
            notional_amount=1,
            quantity=1,
            notional_currency='GDP',
            maturity_date='2020-02-20',
            underlying_price=1,
            underlying_currency='USD',
            strike_price=1
        )
        updated_data = {
            'date_of_trade': self.today,
            'trade_id': 8,
            'product': '3',
            'buying_party': '1',
            'selling_party': '1',
            'notional_amount': 6.0,
            'quantity': 1.0,
            'notional_currency': '1',
            'maturity_date': '2020-02-20',
            'underlying_price': 1.0,
            'underlying_currency': '1',
            'strike_price': 5.0
        }       
        response = self.client.put('/trades/8/', data=updated_data)
        self.assertEqual(401, response.status_code)