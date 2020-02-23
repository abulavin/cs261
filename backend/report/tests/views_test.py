"""
Tests for the report generating.
"""
from rest_framework.test import APITestCase

from report.models import Report


class RetriveReportsTest(APITestCase):
    def setUp(self):
        # Create 5 Reports.
        for i in range(1, 6):
            Report.objects.create(date='2020-02-13')

    def test_list_reports(self):
        """Test the reponse and listing of reports."""
        response = self.client.get('/reports/')
        # Test the response status code is correct
        self.assertEqual(200, response.status_code)
        # Test there are 4 DerivativeTrade in the response
        self.assertEqual(4, len(response.data))