import frappe

from mosyerdesign.utils import make_user_workspace

def prepare_user_home(doc, method):
    make_user_workspace(doc.name)