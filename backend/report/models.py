from django.db import models


class Report(models.Model):
    """
    Model to store a report along with the date it was generated.
    """
    def get_upload_path(self, filename):
        return os.path.join('report/reports/', self.date_generated, '-', self.id, '.pdf')

    date = models.DateField(auto_now_add=True)
    report = models.FileField(upload_to=get_upload_path)

    class Meta:
        ordering = ['-date']