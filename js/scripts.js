// Visualisation data as object
const data = {
  Person: [{
      fistName: "James",
      lastName: "Smith",
      dob: "12-08-1990",
      conutnry: "Singapore",
      idType: "Passport",
      widoId: "4578"
  }, {
      fistName: "Anna",
      lastName: "Johnson",
      dob: "29-02-1967",
      conutnry: "Singapore",
      idType: "Singapore Pass",
      widoId: "0956"
  }, {
      fistName: "Richard",
      lastName: "Jameson",
      dob: "09-12-1978",
      conutnry: "Japan",
      idType: "Work Permit",
      widoId: "5290"
  }, {
      fistName: "Emma",
      lastName: "Semuels",
      dob: "05-01-1988",
      conutnry: "USA",
      idType: "Passport",
      widoId: "1143"
  }, ],
  Officers: [{
      person: "4578",
      role: "Shareholder",
      startDate: "13-08-2010",
      widoId: "2806"
  }, {
      person: "1143",
      role: "Shareholder",
      startDate: "25-05-2015",
      widoId: "4530"
  }, {
      person: "5290",
      role: "Director",
      startDate: "31-10-2018",
      widoId: "8657"
  }, {
      person: "5290",
      role: "Secretary",
      startDate: "17-07-2012",
      widoId: "0012"
  }],
  ShareholdingDetail: [{
      person: "4578",
      certificateNumber: 1,
      aquisitionDate: "06-02-2017",
      shareClass: "Ordinary",
      shareCurrency: "US Dollar",
      shareQty: 100,
      widoId: "2632"
  }, {
      person: "4578",
      certificateNumber: 2,
      aquisitionDate: "10-09-2017",
      shareClass: "Ordinary",
      shareCurrency: "US Dollar",
      shareQty: 400,
      widoId: "9235"
  }, {
      person: "4578",
      certificateNumber: 3,
      aquisitionDate: "19-06-2018",
      shareClass: "Preferred",
      shareCurrency: "Singapore Dollar",
      shareQty: 250,
      widoId: "2948"
  }, {
      person: "1143",
      certificateNumber: 4,
      aquisitionDate: "05-09-2019",
      shareClass: "Ordinary",
      shareCurrency: "Euro",
      shareQty: 150,
      widoId: "1212"
  }],
  ShareholdingSummary: [{
      person: "4578",
      shareClass: "Ordinary",
      shareCurrency: "US Dollar",
      shareQty: 500,
      widoId: "9822"
  }, {
      person: "4578",
      shareClass: "Preferred",
      shareCurrency: "Singapore Dollar",
      shareQty: 250,
      widoId: "2343"
  }, {
      person: "1143",
      shareClass: "Ordinary",
      shareCurrency: "Euro",
      shareQty: 150,
      widoId: "9678"
  }]
}

// Defining a class "Companies"
class Companies {
constructor({
      Person = [],
      Officers = [],
      ShareholdingDetail = [],
      ShareholdingSummary = []
  }) {
      this.data = {
          Company: {
              Person,
              Officers,
              ShareholdingDetail,
              ShareholdingSummary
          }
      }
  }

// Creating a Class method named "createDeal", that returns the information about the certificate
createDeal(operation) {
      const forPersonId = this.getPersonId(operation.for);
      const fromPersonId = this.getPersonId(operation.from);
      const shareClass = operation.shareClass;
      const shareCurrency = operation.shareCurrency;
      const shareQty = operation.shareQty;

      this.updateRole(
          forPersonId, {
              role: "Shareholder"
          });
      this.addEntryToShareholdingDetail({
          person: forPersonId,
          certificateNumber: this.data.Company.ShareholdingDetail.length + 1,
          aquisitionDate: this.getDate(),
          shareClass,
          shareCurrency,
          shareQty,
          widoId: this.generateWidoId()
      });
      this.updateShareholdingSummary(
          forPersonId, fromPersonId, shareQty, shareClass, shareCurrency);
      console.log(this.data.Company);
  }

  // Creating a Class method named "getPersonId", that returns person unique id(widoId)
  getPersonId(data) {
      const person =
      this.data.Company.Person.find((person) => person.fistName === data.firstName && person.lastName === data.lastName) || {};
      return person.widoId;
   }

   // Creating a Class method named "updateRole", that updates role
   updateRole(id, updates = {}) {
      let roles = this.data.Company.Officers.filter((item) => item.person === id && item.role === updates.role);
      if (!roles.length) {
          this.data.Company.Officers.push({
              person: id,
              role: updates.role,
              startDate: this.getDate(),
              widoId: this.generateWidoId()
          })
      }
  }

// Creating a Class method named "addEntryToShareholdingDetail", that add date to the table
addEntryToShareholdingDetail(entryData = {}) {
  this.data.Company.ShareholdingDetail.push(entryData);
}

// Creating a Class method named "updateShareholdingSummary", that updates tables
updateShareholdingSummary(
      forPersonId, fromPersonId, shareQty, shareClass, shareCurrency) {
      let forData = this.data.Company.ShareholdingSummary.find((item) => item.person ===
          forPersonId) || {};
      let fromData = this.data.Company.ShareholdingSummary.find((item) => item.person === fromPersonId) || {};
      //Checking if user with id is exist, if not - creating one.
      if (Object.keys(forData).length) {
          const forIdIndex = this.data.Company.ShareholdingSummary.findIndex((item) => item.person ===
              forPersonId) || {};
          this.data.Company.ShareholdingSummary[forIdIndex].shareQty = forData.shareQty + shareQty;
      } else {
          this.data.Company.ShareholdingSummary.push({
              person: forPersonId,
              shareClass,
              shareCurrency,
              shareQty,
              widoId: this.generateWidoId()
          })
      }
      const byIdIndex = this.data.Company.ShareholdingSummary.findIndex((item) => item.person === fromPersonId) || {};
      this.data.Company.ShareholdingSummary[byIdIndex].shareQty = fromData.shareQty - shareQty;
  }

  // Getting date in order to add it to the table
  getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      return dd + '-' + mm + '-' + yyyy
  }

  // Generation of a unique id
  generateWidoId() {
  return `${Math.floor(1000 + Math.random() * 9000)}`;
  }
}

// Creation of new instance of Class
const instance = new Companies(data);

// Data
const operation = {
  for: {
      firstName: "Richard",
      lastName: "Jameson"
  },
  from: {
      firstName: "Emma",
      lastName: "Semuels"
  },
  shareClass: "Ordinary",
  shareCurrency: "Euro",
  shareQty: 50
}

// Calling class instance as a function
instance.createDeal(operation);